// @ts-ignore
const winningMessage = document.querySelector("#winningMessage");
const sideBar = document.querySelector('.sideBar');
const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cells');
const newGame = document.querySelector('.newGameBtn');
const join = document.querySelector('.joinBtn');
const connect = document.querySelector('.connectBtn');
const list = document.querySelector('ul');
newGame.disabled = true;
join.disabled = true;
let clientID;
let gameID;
let socket;
let mark;
let currentTurn = false;


connect.addEventListener('click', (e) => {
  socket = new WebSocket("ws://localhost:4006");
  socket.onmessage = onMessage;
  e.target.disabled = true;
});

join.addEventListener('click', () => {
  socket.send(JSON.stringify({
    'tag': 'join',
    'clientID': clientID,
    'gameID': gameID
  }));
});



function onMessage(message) {
  const data = JSON.parse(message.data);

  switch (data.tag) {

    case "connected":
      clientID = data.clientID;
      const div = document.createElement("div");
      div.innerHTML = `PlayerID: ${clientID}`;
      sideBar.prepend(div);   
      newGame.disabled = false;    
      join.disabled = false;
      break;


    case "gamesList":
      const games = data.list;

      while (list.firstChild) {
        list.removeChild(list.lastChild);
      }
      games.forEach((game) => {
        const li = document.createElement("li");
        li.innerText = game;
        list.appendChild(li);

        li.addEventListener("click", () => {
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
      cells.forEach((cell) => {
        if (cell.classList.contains("cross")) {
          cell.classList.remove("cross");
        } else cell.classList.contains("circle");
        cell.classList.remove("circle");
      });

      for (let i = 0; i < cells.length; i++) {
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
      winningMessage.innerHTML = `CONGRATS! <br> ${data.winner} Win! 
                                <img src="./img/happy.png"></img>  
                                <button id="restartButton" onclick="handleRestartGame()">Restart</button>`;
      winningMessage.classList.add("show");
      break;


    case "gameDraw":
      winningMessage.innerHTML = `Game Over! <br> Maybe next time... 
                                <img src="./img/sad.png"></img> 
                                <button id="restartButton" onclick="handleRestartGame()">Restart</button>`;
      winningMessage.classList.add("show");
      break;
  }

};


function makeMove(e) {
  cells.forEach(cell => {
    if (!cell.classList.contains('cross') && !cell.classList.contains('circle')) {
      cell.addEventListener('click', cellClicked);
    }
  })
  console.log(makeMove());
};

function cellClicked(e) {
  // let icon;

  // if(mark === 'cross') {
  //     icon = 'cross';
  // } else {
  //     icon = 'circle';
  // }
  // e.target.classList.add(icon);

  if (!currentTurn || e.target.classList.contains('cross') || (e.target.classList.contains('circle'))) {
    return
  };

  const cellclass = mark === 'cross' ? 'cross' : 'circle';
  e.target.classList.add(cellclass);

  const board = [];

  for (let i = 0; i < cells.length; i++) {
    if (cells[i].classList.contains('circle')) {
      board[i] = 'circle';
    } else if (cells[i].classList.contains('cross')) {
      board[i] = 'cross';
    } else {
      board[i] = '';
    }
  }
  // currentTurn = false;

  cells.forEach((cell => {
    cell.removeEventListener('click', cellClicked);
  }));

  socket.send(JSON.stringify({
    'tag': 'moveMade',
    'board': board,
    'clientID': clientID,
    'gameID': gameID
  }));

  makeMove();
};

newGame.addEventListener('click', () => {
  socket.send(JSON.stringify({
    'tag': 'newGame',
    'clientID': clientID
  }))
});





// function makeMove() {

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