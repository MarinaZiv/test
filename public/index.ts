let axios;

const state = {
  matchedCards: [],
  cardsArray: [],
  timeRemaining: null,
  totalFlipsStatist: 0,
  clickNumber: 0,
  totalTime: 20,
};

// const statistic = {
//   totalRounds: 0,
//   totalWinnings: 0,
//   totalDraws: 0,
//   totalFlips: 0,
//   timeStatistic: 0,
//   winningPoints: 0,
// };

function generalStatistic() {
  if (handleStartGame || gameOver) {
    // statistic.totalRounds++;
  }

  if (handleStartGame && handleFlipCard) {
    // statistic.totalFlips++;
    // statistic.timeStatistic++;
  }

  // if (victory) {
  //   statistic.winningPoints++;
  //   statistic.totalWinnings++;
  // } else if (gameOver) {
  //   statistic.totalDraws++;
  //   statistic.winningPoints--;
  // }
}

const loadNewGame = async function loadgame() {
  const { pairedCardArray, lastLoggedInPlayer } = await getDeck();
  renderDeck(pairedCardArray);
  renderPlayer(lastLoggedInPlayer);
};

const loadPlayersList = async function loadgame() {
  const { players, lastLoggedInPlayer } = await getDeck();
  console.log(players, lastLoggedInPlayer);
  renderPlayerList(players);
  renderGeneralStatistic(lastLoggedInPlayer); 
};

function handleToRegisterForm() {
  const formLogin: any = document.querySelector(".name");
  const formRegister: any = document.querySelector(".register");
  const registerLink: any = document.querySelector(".register-link");
  const error: any = document.querySelector(".error");
  registerLink.style.display = "none";
  formLogin.style.display = "none";
  error.style.display = "none";
  formRegister.style.display = "block";
}

function renderDeck(pairedCardArray) {
  const root = document.querySelector("#root");
  let html = "";
  pairedCardArray.forEach((obj) => {
    html += `
        <div class="containerGame__card" onclick="handleFlipCard(event)" id="${obj.cardID}" >
              <img class="containerGame__card__back containerGame__card__face" id="${obj.cardID}" src="./img/back.jpg">       
              <img class="containerGame__card__front containerGame__card__face" id="${obj.cardID}" src="${obj.url}">           
        </div>
        `;
  });
  root.innerHTML = html;
}

function renderPlayer(lastLoggedInPlayer) {
  const playerRoot = document.querySelector("#playerRoot");
  let html = "";
  html += `<p style="font-size: 1.8rem;" ${lastLoggedInPlayer.playerID}>playing now: <span style="color:rgba(130, 29, 18, 0.591);font-size: 2.5rem; font-weight: bold;">${lastLoggedInPlayer.name}</span></p>`;
  playerRoot.innerHTML = html;
};

function renderPlayerList(players) {
  const playersList = document.querySelector("#playersListRoot");
  let playerhtml = "";
  players.forEach((player) => {
    playerhtml += `  
    <p  class="GeneralStatisicPlayerList" onclick="handleGeneralStatisicPlayerList()">Player&nbsp;: <span style="color: rgba(130, 29, 18, 0.691); font-family: 'Russo One', sans-serif;  font-family: 'Russo One', sans-serif;  font-weight: bold; cursor: pointer;">&nbsp;${player.name}</span></p>`;
  });
  playersList.innerHTML = playerhtml;
}

function renderGeneralStatistic(lastLoggedInPlayer) {
  const statisticRoot = document.querySelector("#statisticRoot");
  let html = "";
  html += `
            <h3 ${lastLoggedInPlayer.playerID}>Name&nbsp;: &nbsp;&nbsp;&nbsp;&nbsp; <span style="color:rgba(130, 29, 18, 0.691); letter-spacing: 2px; font-family: 'Russo One', sans-serif;  font-weight: bold; font-size: 1.6rem;">${lastLoggedInPlayer.name}</span></h3>
            <div class="generalStatistic__info-totalRounds">
                <p>Total Rounds&nbsp;:</p>
                <h1 style="color: rgba(130, 29, 18, 0.591); font-weight: bold;">${lastLoggedInPlayer.totalRounds}</h1>
            </div>
            <div class="generalStatistic__info-time" ${lastLoggedInPlayer.playerID}>
                <p>Time&nbsp;: <span style="color: rgba(130, 29, 18, 0.691); font-weight: bold;"></span></p>
                <h1 style="color: rgba(130, 29, 18, 0.691);font-weight: bold;">${lastLoggedInPlayer.timeStatist}</h1>
            </div>          
            <div class="generalStatistic__info-flips" ${lastLoggedInPlayer.playerID}>
                <p>Flips&nbsp;:</p>
                <h1 style="color: rgba(130, 29, 18, 0.691); font-weight: bold;">${lastLoggedInPlayer.totalFlip}</h1>
            </div>         
        `;

  statisticRoot.innerHTML = html;
}

async function getDeck() {
  try {
    const { data } = await axios.post("/get-deck");
    const { pairedCardArray, players, lastLoggedInPlayer } = data;    
    console.log("this is the deck data from the server:", data);
    return data;

  } catch (error) {
    console.error(error);
  }
}


async function handleRegester(e: any) {
  try {
    console.dir(e.target);
    e.preventDefault();
    let { name, password } = e.target.elements;
    name = name.value;
    password = password.value;    
    console.log(name, password);

    const { data } = await axios.post("/player-add", { name, password });
    const {players} = data;
    console.log(players);
    window.location.href = "./game.html";
    e.target.reset();

  } catch (error) {
    console.error(error);
  }
}

async function handleLogin(e: any) {
  console.log(e.target);
  e.preventDefault();
  const name = e.target.elements.name.value;
  const password = e.target.elements.password.value;
  console.log(name, password);
  const { data } = await axios.get(`/check-if-exist?name=${name}&password=${password}`);
  const { filteredPlayers } = data;
  console.log(data);
  e.target.reset();

  if (filteredPlayers.length > 0) {
    window.location.href = "./game.html";
  } else {
    document.querySelector<HTMLElement>("#loginPage").innerHTML = `
     <div class="userLoginError">
        <p class="error" >Sorry, the player <span style="color: rgb(163, 38, 24);"   </span> ${name}  </span> is not exist yet, please register first</p>
        <p class="register-link" onclick="handleToRegisterForm()">If you are not a member, there is <span
                    style="text-decoration: underline; cursor: pointer"> one more step to do</span></p>
     </div>
    `;
  }
}

const handleStartGame = () => {
  const winningMessage: HTMLElement = document.querySelector("#winningMessage");
  state.totalFlipsStatist++;
  state.totalTime = 20;
  resetAll();
  startMusic();
  
  state.timeRemaining = setInterval(() => {
    let timer: any = document.querySelector("#time-remaining");
    state.totalTime--;
    timer.innerText = `${state.totalTime}`;

    if (state.totalTime === 0) {
      clearInterval(state.timeRemaining);
      gameOver();
    }
  }, 1000);

  winningMessage.classList.remove("show");
};

const handleFlipCard = (e: any, playerID: string) => {
  const element = e.currentTarget;
  state.clickNumber++;
  flipMusic();
  let ticker: any = document.querySelector("#flips");
  state.totalFlipsStatist++;
  ticker.innerText = `${state.totalFlipsStatist}`;
  const totalFlip = ticker.innerText;
  
  if(totalFlip) {
    const updatePlayerStatistic = async function (playerID: string) {
      const { data } = await axios.post("/player-statistic-update", { playerID, totalFlip});
      const {players, error} = data;  // returns undefined
      if (error) throw new Error(error);
      console.log(players);
    }
    updatePlayerStatistic(playerID);
  }
  
  if (state.clickNumber <= 2) {
    if (element.className === "containerGame__card") {
      if (element.style.transform === "rotateY(180deg)") {
        element.style.transform = "rotateY(0deg)";
      } else {
        element.style.transform = "rotateY(180deg)";
        state.matchedCards.push(element);

        if (state.clickNumber === 2) {
          const checkMatch = async function () {
            const { data } = await axios.get(`/check-match?card1=${state.matchedCards[0].id}&card2=${state.matchedCards[1].id}`);

            if (data == true) {
              state.matchedCards[0].style.opacity = "0";
              state.matchedCards[1].style.opacity = "0";
            }
          };
          checkMatch();
        } else {
          state.cardsArray.push(element);
        }
       
      }
    }
  } else {
    flipBackUnPairedCards();
    state.clickNumber = 0;
  }
  // console.dir(state.clickNumber);
  // console.dir(e.target.id);
  console.log(element.id);
  console.log(element);
  console.log(state.matchedCards);
};

const winStateCheck = () => {
  console.log(state.matchedCards, state.cardsArray.length);
  if (state.matchedCards.length === state.cardsArray.length) {
    victory();
  }
};

function flipBackUnPairedCards() {
  const cards: any = document.querySelectorAll(".containerGame__card");
  Array.from(cards).forEach(function (card) {
    //@ts-ignore
    card.style.transform = "rotateY(0deg)";
    state.matchedCards = [];
  });
}

const gameOver = () => {
  state.totalFlipsStatist = 0;
  state.totalTime = 0;
  gameOverSound();
  stopMusic();
  hideCards();
  drawMessage();
};

const victory = () => {
  const victory: any = document.querySelector("#victory");
  const bgMusic: any = document.querySelector("#creepy");
  state.totalFlipsStatist = 0;
  state.totalTime = 0;
  victory.play();
  bgMusic.pause();
  hideCards();
  if (state.matchedCards.length === state.cardsArray.length) {
    victory();
  }
};

function hideCards() {
  const deck = document.querySelector(".containerGame");

  while (deck.hasChildNodes()) {
    deck.removeChild(deck.firstChild);
  }
}

function resetAll() {
  state.totalFlipsStatist = 0;
  state.clickNumber = 0;
  stopMusic();
  loadNewGame();
}

function handleRestartGame() {
  const winningMessage: HTMLElement = document.querySelector("#winningMessage");
  document.querySelector<HTMLElement>(".title-game").style.display = "block";
  winningMessage.classList.remove("show");
  state.totalFlipsStatist = 0;
  handleStartGame();
}

function winMessage() {
  const winningMessage: HTMLElement = document.querySelector("#winningMessage");
  document.querySelector<HTMLElement>(".title-game").style.display = "none";

  winningMessage.innerHTML = `CONGRATS! <br> You Win!
                                <img style ="width: 300px; padding-top: 2.5%; padding-bottom: 1.5%;" src="../img/queen.png"></img>
                              <div class="message-buttons"> 
                                <button class="statisticBtn" id="restartButton" onclick="handleRestartGame()">Restart</button>
                                <button class="statisticBtn" onclick="handleToGeneralStatistic()">Statistics</button>
                              </div> 
                                `;

  winningMessage.classList.add("show");
}

function drawMessage() {
  const winningMessage: HTMLElement = document.querySelector("#winningMessage");
  document.querySelector<HTMLElement>(".title-game").style.display = "none";

  winningMessage.innerHTML = `Game Over :( <br> Next time surely..!
                                <img src="../img/joker.png"></img>
                              <div class="message-buttons">
                                <button class="statisticBtn" id="restartButton" onclick="handleRestartGame()">Restart</button>
                                <button class="statisticBtn" onclick="handleToGeneralStatistic()">Statistics</button>
                              </div> 
                                `;

  winningMessage.classList.add("show");
}

// SOUNDS =====================================================================================
function gameOverSound() {
  const gameOver: any = document.querySelector("#gameOver");
  gameOver.play();
}

function startMusic() {
  const bgMusic: any = document.querySelector("#creepy");
  bgMusic.play();
  bgMusic.volume = 0.4;
  bgMusic.loop = true;
}

function stopMusic() {
  const bgMusic: any = document.querySelector("#creepy");
  bgMusic.pause();
}

function flipMusic() {
  const flip: any = document.querySelector("#flip");
  flip.play();
}

function matchSound() {
  const match: any = document.querySelector("#match");
  match.play();
}

function getRootElement() {
  const rootHTML = <HTMLElement>document.querySelector(".root");
  return rootHTML;
}

function log(log) {
  console.log(log);
  console.dir(log);
}

function handleToGeneralStatistic() {
  window.location.href = "./statistic.html";
}

function handleBackToGame() {
  window.location.href = "./game.html";
}

function handleBackToLogin() {
  window.location.href = "./index.html";
}

function pulseLogin() {
  setInterval(() => {
    setTimeout(() => {
      document.querySelector<HTMLElement>(".smilyImg-players").style.transform =
        "scale(1.5)";
      document.querySelector<HTMLElement>(
        ".smilyImg-players"
      ).style.transition = "all 4s ease";
    }, 4000);
    setTimeout(() => {
      document.querySelector<HTMLElement>(".smilyImg-players").style.transform =
        "scale(1.0)";
      document.querySelector<HTMLElement>(
        ".smilyImg-players"
      ).style.transition = "all 4s ease";
    }, 6000);
  }, 15000);
}

function pulseGame() {
  setInterval(() => {
    setTimeout(() => {
      document.querySelector<HTMLElement>(".smilyImg-game").style.transform =
        "scale(1.5)";
      document.querySelector<HTMLElement>(".smilyImg-game").style.transition =
        "all 4s ease";
    }, 4000);
    setTimeout(() => {
      document.querySelector<HTMLElement>(".smilyImg-game").style.transform =
        "scale(1.0)";
      document.querySelector<HTMLElement>(".smilyImg-game").style.transition =
        "all 4s ease";
    }, 6000);
  }, 15000);
}

function pulseStatistic() {
  setInterval(() => {
    setTimeout(() => {
      document.querySelector<HTMLElement>(
        ".smilyImg-statistic"
      ).style.transform = "scale(1.5)";
      document.querySelector<HTMLElement>(
        ".smilyImg-statistic"
      ).style.transition = "all 4s ease";
    }, 4000);
    setTimeout(() => {
      document.querySelector<HTMLElement>(
        ".smilyImg-statistic"
      ).style.transform = "scale(1.0)";
      document.querySelector<HTMLElement>(
        ".smilyImg-statistic"
      ).style.transition = "all 4s ease";
    }, 6000);
  }, 12000);
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};



// async function handleUpdatePlayerName(e: any, newPlayerID: string) {
//   try {
//     console.dir(e.target.elements.name.value);
//     e.preventDefault();
//     const name = e.target.elements.name.value;
//     const { data } = await axios.patch("/player-name-update", {
//       newPlayerID,
//       name,
//     });
//     const { players, error } = data;
//     // if(error) throw new Error(error.message);
//     console.log(players);
//     window.location.href = "./game.html";
//   } catch (error) {
//     console.error(error);
//   }
// }

