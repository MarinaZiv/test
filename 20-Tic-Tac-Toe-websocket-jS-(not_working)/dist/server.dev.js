"use strict";

// @ts-ignore
var http = require('http').createServer().listen(4006, console.log('listening on port 4006'));

var server = require('websocket').server;

var socket = new server({
  'httpServer': http
});
var games = {};
var player = {};
var clients = {};
var winCombination = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
socket.on('request', function (req) {
  var connection = req.accept(null, req.origin); // 'null' is only accept the req, 'req.origin' - whatever this req is - accept it

  var clientID = Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10);
  clients[clientID] = {
    'connection': connection
  };
  connection.send(JSON.stringify({
    "tag": 'connected',
    "clientID": clientID
  }));
  sendAvailableGame();
  connection.on('message', onMessage);
});

function sendAvailableGame() {
  var gamesList = [];

  for (var game in games) {
    if (games[game].players.length < 2) {
      gamesList.push(game);
    }
  }

  for (var client in clients) {
    clients[client].connection.send(JSON.stringify({
      'tag': 'gamesList',
      'list': gamesList
    }));
  }
}

;

function onMessage(message) {
  var data = JSON.parse(message.utf8Data);

  switch (data.tag) {
    case 'newGame':
      var gameID = Math.floor(Math.random() * 100) + Math.floor(Math.random() * 100) + Math.floor(Math.random() * 100);
      var board = ['', '', '', '', '', '', '', '', ''];
      player = {
        'clientID': data.clientID,
        'mark': 'cross',
        'currentTurn': true
      };
      var players = Array(player);
      games[gameID] = {
        'board': board,
        'players': players
      };
      clients[data.clientID].connection.send(JSON.stringify({
        'tag': 'newGame',
        'gameID': gameID
      }));
      sendAvailableGame();
      break;

    case 'join':
      player = {
        'clientID': data.clientID,
        'mark': 'circle',
        'currentTurn': false
      };
      games[data.gameID].players.push(player);
      sendAvailableGame();
      games[data.gameID].players.forEach(function (player) {
        clients[player.clientID].connection.send(JSON.stringify({
          'tag': 'joined',
          'gameID': data.gameID,
          'mark': player.mark
        }));
      });
      updateBoard(data.gameID);
      break;

    case 'moveMade':
      games[data.gameID].board = data.board;
      console.log(games[data.gameID].board);
      console.log(data.board);
      var winner = winState(data.gameID);
      var draw = drawState(data.gameID);

      if (winner) {
        games[data.gameID].players.forEach(function (player) {
          clients[player.clientID].connection.send(JSON.stringify({
            'tag': 'winner',
            'winner': player.mark
          }));
        });
      } else if (draw) {
        games[data.gameID].players.forEach(function (player) {
          clients[player.clientID].connection.send(JSON.stringify({
            'tag': 'gameDraw'
          }));
        });
      } else {
        games[data.gameID].players.forEach(function (player) {
          player.currentTurn = !player.currentTurn;
        });
      }

      updateBoard(data.gameID);
      break;
  }
}

function updateBoard(gameID) {
  games[gameID].players.forEach(function (player) {
    clients[player.clientID].connection.send(JSON.stringify({
      'tag': 'updateBoard',
      'currentTurn': player.currentTurn,
      'board': games[gameID].board
    }));
  });
}

;

function winState(gameID) {
  return winCombination.every(function (row) {
    return row.some(function (cell) {
      return games[gameID].board[cell] === 'cross';
    }) || row.some(function (cell) {
      return games[gameID].board[cell] === 'circle';
    });
  });
}

;

function drawState(gameID) {
  return winCombination.every(function (row) {
    return row.some(function (cell) {
      return games[gameID].board[cell] === 'cross';
    }) && row.some(function (cell) {
      return games[gameID].board[cell] === 'circle';
    });
  });
}

;