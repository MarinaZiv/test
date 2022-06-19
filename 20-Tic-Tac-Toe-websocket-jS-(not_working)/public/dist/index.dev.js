"use strict";

// @ts-ignore
var winningMessage = document.querySelector("#winningMessage");
var sideBar = document.querySelector('.sideBar');
var board = document.querySelector('.board');
var cells = document.querySelectorAll('.cells');
var newGame = document.querySelector('.newGameBtn');
var join = document.querySelector('.joinBtn');
var connect = document.querySelector('.connectBtn');
var list = document.querySelector('ul');
newGame.disabled = true;
join.disabled = true;
var clientID;
var gameID;
var socket;
var mark;
var currentTurn = false;
connect.addEventListener('click', function (e) {
  socket = new WebSocket("ws://localhost:4006");
  socket.onmessage = onMessage;
  e.target.disabled = true;
});
join.addEventListener('click', function () {
  socket.send(JSON.stringify({
    'tag': 'join',
    'clientID': clientID,
    'gameID': gameID
  }));
});

function onMessage(message) {
  var data = JSON.parse(message.data);

  switch (data.tag) {
    case "connected":
      clientID = data.clientID;
      var div = document.createElement("div");
      div.innerHTML = "PlayerID: ".concat(clientID);
      sideBar.prepend(div);
      newGame.disabled = false;
      join.disabled = false;
      break;

    case "gamesList":
      var games = data.list;

      while (list.firstChild) {
        list.removeChild(list.lastChild);
      }

      games.forEach(function (game) {
        var li = document.createElement("li");
        li.innerText = game;
        list.appendChild(li);
        li.addEventListener("click", function () {
          gameID = game;
        });
      });
      break;

    case "newGame":
      gameID = data.gameID;
      newGame.disabled = true;
      join.disabled = true;
      break;

    case "joined":
      document.querySelector(".board").style.display = "grid";
      mark = data.mark;

      if (mark === "cross") {
        board.classList.add("cross");
      } else {
        board.classList.add("circle");
      }

      break;

    case "updateBoard":
      cells.forEach(function (cell) {
        if (cell.classList.contains("cross")) {
          cell.classList.remove("cross");
        } else cell.classList.contains("circle");

        cell.classList.remove("circle");
      });

      for (var i = 0; i < cells.length; i++) {
        if (data.board[i] === "cross") {
          cells[i].classList.add("cross");
        } else if (data.board[i] === "o") {
          cells[i].classList.add("circle");
        }
      }

      if (data.currentTurn) {
        makeMove();
      }

      break;

    case "winner":
      winningMessage.innerHTML = "CONGRATS! <br> ".concat(data.winner, " Win! \n                                <img src=\"./img/happy.png\"></img>  \n                                <button id=\"restartButton\" onclick=\"handleRestartGame()\">Restart</button>");
      winningMessage.classList.add("show");
      break;

    case "gameDraw":
      winningMessage.innerHTML = "Game Over! <br> Maybe next time... \n                                <img src=\"./img/sad.png\"></img> \n                                <button id=\"restartButton\" onclick=\"handleRestartGame()\">Restart</button>";
      winningMessage.classList.add("show");
      break;
  }
}

;

function makeMove(e) {
  cells.forEach(function (cell) {
    if (!cell.classList.contains('cross') && !cell.classList.contains('circle')) {
      cell.addEventListener('click', cellClicked);
    }
  });
  console.log(makeMove());
}

;

function cellClicked(e) {
  // let icon;
  // if(mark === 'cross') {
  //     icon = 'cross';
  // } else {
  //     icon = 'circle';
  // }
  // e.target.classList.add(icon);
  if (!currentTurn || e.target.classList.contains('cross') || e.target.classList.contains('circle')) {
    return;
  }

  ;
  var cellclass = mark === 'cross' ? 'cross' : 'circle';
  e.target.classList.add(cellclass);
  var board = [];

  for (var i = 0; i < cells.length; i++) {
    if (cells[i].classList.contains('circle')) {
      board[i] = 'circle';
    } else if (cells[i].classList.contains('cross')) {
      board[i] = 'cross';
    } else {
      board[i] = '';
    }
  } // currentTurn = false;


  cells.forEach(function (cell) {
    cell.removeEventListener('click', cellClicked);
  });
  socket.send(JSON.stringify({
    'tag': 'moveMade',
    'board': board,
    'clientID': clientID,
    'gameID': gameID
  }));
  makeMove();
}

;
newGame.addEventListener('click', function () {
  socket.send(JSON.stringify({
    'tag': 'newGame',
    'clientID': clientID
  }));
}); // function makeMove() {
//     index = 0
//     cells.forEach((cell) => {
//         if (cell.classList.contains('cross'))
//             game.board[index] == 'cross'
//         if (cell.classList.contains('circle'))
//             game.board[index] == 'circle'
//         index++
//     })
//     cells.forEach(cell => cell.removeEventListener('click', clickCell))
//     const payLoad = {
//         'tag': 'makeMove',
//         'game': gameID
//     }
//     socket.send(JSON.stringify(payLoad))
//   console.log(makeMove());
// };
// function clickCell(event) {
//     if (!currentTurn || event.target.classList.contains('cross') || (event.target.classList.contains('circle')))
//         return
//     const cellclass = mark === 'cross' ? 'cross' : 'circle'
//     event.target.classList.add(cellclass)
//     index = 0
//     cells.forEach(cell => {
//         if (cell.classList.contains('cross'))
//             board[index] = 'cross'
//         if (cell.classList.contains('circle'))
//             board[index] = 'o'
//         index++
//     })
//     currentTurn = false
//     makeMove()
// }