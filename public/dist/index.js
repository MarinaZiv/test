var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var axios;
// interface Game {
//   cards: Array<Card>;
//   players: Array<Player>;
// }
// interface Player {
//   name: string;
//   password: any;
//   totalRounds: number;
//   totalFlip: number;
//   timeStatist: number;
//   playerID: string;
// }
// interface Card {
//   url: string;
//   cardID: number;
// }
// const game = {
//   cards: [
//     {
//       url: "./img/1.jpg",
//       cardID: 1,
//     },
//     {
//       url: "./img/2.jpg",
//       cardID: 2,
//     },
//     {
//       url: "./img/3.jpg",
//       cardID: 3,
//     },
//     {
//       url: "./img/4.jpg",
//       cardID: 4,
//     },
//     {
//       url: "./img/5.jpg",
//       cardID: 5,
//     },
//     {
//       url: "./img/6.jpg",
//       cardID: 6,
//     },
//     {
//       url: "./img/7.jpg",
//       cardID: 7,
//     },
//     {
//       url: "./img/8.jpg",
//       cardID: 8,
//     },
//   ],
//   players: [
//     {
//       name: "Ryu",
//       password: "123",
//       totalRounds: 0,
//       totalFlip: 0,
//       timeStatist: 0,
//       playerID: uid(),
//     },
//   ],
// };
var state = {
    matchedCards: [],
    cardsArray: [],
    timeRemaining: null,
    totalFlipsStatist: 0,
    clickNumber: 0,
    totalTime: 20
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
var loadNewGame = function loadgame() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, pairedCardArray, lastLoggedInPlayer;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getDeck()];
                case 1:
                    _a = _b.sent(), pairedCardArray = _a.pairedCardArray, lastLoggedInPlayer = _a.lastLoggedInPlayer;
                    renderDeck(pairedCardArray);
                    renderPlayer(lastLoggedInPlayer);
                    return [2 /*return*/];
            }
        });
    });
};
var loadPlayersList = function loadgame() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, players, lastLoggedInPlayer;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getDeck()];
                case 1:
                    _a = _b.sent(), players = _a.players, lastLoggedInPlayer = _a.lastLoggedInPlayer;
                    console.log(players, lastLoggedInPlayer);
                    renderPlayerList(players);
                    renderGeneralStatistic(lastLoggedInPlayer);
                    return [2 /*return*/];
            }
        });
    });
};
function handleToRegisterForm() {
    var formLogin = document.querySelector(".name");
    var formRegister = document.querySelector(".register");
    var registerLink = document.querySelector(".register-link");
    formLogin.style.display = "none";
    registerLink.style.display = "none";
    formRegister.style.display = "block";
}
function renderDeck(pairedCardArray) {
    var root = document.querySelector("#root");
    var html = "";
    pairedCardArray.forEach(function (obj) {
        html += "\n        <div class=\"containerGame__card\" onclick=\"handleFlipCard(event)\" id=\"" + obj.cardID + "\" >\n              <img class=\"containerGame__card__back containerGame__card__face\" id=\"" + obj.cardID + "\" src=\"./img/back.jpg\">       \n              <img class=\"containerGame__card__front containerGame__card__face\" id=\"" + obj.cardID + "\" src=\"" + obj.url + "\">           \n        </div>\n        ";
    });
    root.innerHTML = html;
}
function renderPlayer(lastLoggedInPlayer) {
    var playerRoot = document.querySelector("#playerRoot");
    var html = "";
    html += "<p style=\"font-size: 1.8rem;\" " + lastLoggedInPlayer.playerID + ">playing now: <span style=\"color:rgba(130, 29, 18, 0.591);font-size: 2.5rem; font-weight: bold;\">" + lastLoggedInPlayer.name + "</span></p>";
    playerRoot.innerHTML = html;
}
;
function renderPlayerList(players) {
    var playersList = document.querySelector("#playersListRoot");
    // playersList.innerHTML += `<p class="generalStatistic-title" id="game-title">All players:</p>`;
    var playerhtml = "";
    players.forEach(function (player) {
        playerhtml += "  \n    <p  class=\"GeneralStatisicPlayerList\" onclick=\"handleGeneralStatisicPlayerList()\">Player&nbsp;: <span style=\"color: rgba(130, 29, 18, 0.691); font-family: 'Russo One', sans-serif;  font-family: 'Russo One', sans-serif;  font-weight: bold; cursor: pointer;\">&nbsp;" + player.name + "</span></p>";
    });
    playersList.innerHTML = playerhtml;
}
function renderGeneralStatistic(lastLoggedInPlayer) {
    var statisticRoot = document.querySelector("#statisticRoot");
    var html = "";
    html += "\n            <h3 " + lastLoggedInPlayer.playerID + ">Name&nbsp;: &nbsp;&nbsp;&nbsp;&nbsp; <span style=\"color:rgba(130, 29, 18, 0.691); letter-spacing: 2px; font-family: 'Russo One', sans-serif;  font-weight: bold; font-size: 1.6rem;\">" + lastLoggedInPlayer.name + "</span></h3>\n            <div class=\"generalStatistic__info-totalRounds\">\n                <p>Total Rounds&nbsp;:</p>\n                <h1 style=\"color: rgba(130, 29, 18, 0.591); font-weight: bold;\">" + lastLoggedInPlayer.totalRounds + "</h1>\n            </div>\n\n            <div class=\"generalStatistic__info-time\" " + lastLoggedInPlayer.playerID + ">\n                <p>Time&nbsp;: <span style=\"color: rgba(130, 29, 18, 0.691); font-weight: bold;\"></span></p>\n                <h1 style=\"color: rgba(130, 29, 18, 0.691);font-weight: bold;\">" + lastLoggedInPlayer.timeStatist + "</h1>\n            </div>\n           \n            <div class=\"generalStatistic__info-flips\" " + lastLoggedInPlayer.playerID + ">\n                <p>Flips&nbsp;:</p>\n                <h1 style=\"color: rgba(130, 29, 18, 0.691); font-weight: bold;\">" + lastLoggedInPlayer.totalFlip + "</h1>\n            </div>         \n        ";
    statisticRoot.innerHTML = html;
}
function getDeck() {
    return __awaiter(this, void 0, void 0, function () {
        var data, pairedCardArray, players, lastLoggedInPlayer, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.post("/get-deck")];
                case 1:
                    data = (_a.sent()).data;
                    pairedCardArray = data.pairedCardArray, players = data.players, lastLoggedInPlayer = data.lastLoggedInPlayer;
                    console.log("this is the deck data from the server:", data);
                    return [2 /*return*/, data];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function handleRegester(e) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, name, password, data, players, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    console.dir(e.target);
                    e.preventDefault();
                    _a = e.target.elements, name = _a.name, password = _a.password;
                    name = name.value;
                    password = password.value;
                    console.log(name, password);
                    return [4 /*yield*/, axios.post("/player-add", { name: name, password: password })];
                case 1:
                    data = (_b.sent()).data;
                    players = data.players;
                    console.log(players);
                    window.location.href = "./game.html";
                    e.target.reset();
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _b.sent();
                    console.error(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function handleLogin(e) {
    return __awaiter(this, void 0, void 0, function () {
        var name, password, data, filteredPlayers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(e.target);
                    e.preventDefault();
                    name = e.target.elements.name.value;
                    password = e.target.elements.password.value;
                    console.log(name, password);
                    return [4 /*yield*/, axios.get("/check-if-exist?name=" + name + "&password=" + password)];
                case 1:
                    data = (_a.sent()).data;
                    filteredPlayers = data.filteredPlayers;
                    console.log(data);
                    e.target.reset();
                    if (filteredPlayers.length > 0) {
                        window.location.href = "./game.html";
                    }
                    else {
                        document.querySelector("#loginPage").innerHTML = "\n     <div class=\"userLoginError\">\n        <p class=\"error\" >Sorry, the player <span style=\"color: rgb(163, 38, 24);\"   </span> " + name + "  </span> is not exist yet, please register first</p>\n        <p class=\"register-link\" onclick=\"handleToRegisterForm()\">If you are not a member, there is <span\n                    style=\"text-decoration: underline; cursor: pointer\"> one more step to do</span></p>\n     </div>\n    ";
                    }
                    return [2 /*return*/];
            }
        });
    });
}
var handleStartGame = function () {
    var winningMessage = document.querySelector("#winningMessage");
    state.totalFlipsStatist++;
    state.totalTime = 20;
    resetAll();
    startMusic();
    state.timeRemaining = setInterval(function () {
        var timer = document.querySelector("#time-remaining");
        state.totalTime--;
        timer.innerText = "" + state.totalTime;
        if (state.totalTime === 0) {
            clearInterval(state.timeRemaining);
            gameOver();
        }
    }, 1000);
    winningMessage.classList.remove("show");
};
var handleFlipCard = function (e, playerID) {
    var element = e.currentTarget;
    state.clickNumber++;
    flipMusic();
    var ticker = document.querySelector("#flips");
    state.totalFlipsStatist++;
    ticker.innerText = "" + state.totalFlipsStatist;
    var totalFlip = ticker.innerText;
    if (totalFlip) {
        var updatePlayerStatistic = function (playerID) {
            return __awaiter(this, void 0, void 0, function () {
                var data, players, error;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, axios.post("/player-statistic-update", { playerID: playerID, totalFlip: totalFlip })];
                        case 1:
                            data = (_a.sent()).data;
                            players = data.players, error = data.error;
                            if (error)
                                throw new Error(error);
                            console.log(players);
                            return [2 /*return*/];
                    }
                });
            });
        };
        updatePlayerStatistic(playerID);
    }
    if (state.clickNumber <= 2) {
        if (element.className === "containerGame__card") {
            if (element.style.transform === "rotateY(180deg)") {
                element.style.transform = "rotateY(0deg)";
            }
            else {
                element.style.transform = "rotateY(180deg)";
                state.matchedCards.push(element);
                if (state.clickNumber === 2) {
                    var checkMatch = function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var data;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, axios.get("/check-match?card1=" + state.matchedCards[0].id + "&card2=" + state.matchedCards[1].id)];
                                    case 1:
                                        data = (_a.sent()).data;
                                        if (data == true) {
                                            state.matchedCards[0].style.opacity = "0";
                                            state.matchedCards[1].style.opacity = "0";
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        });
                    };
                    checkMatch();
                }
                else {
                    state.cardsArray.push(element);
                }
            }
        }
    }
    else {
        flipBackUnPairedCards();
        state.clickNumber = 0;
    }
    winStateCheck();
    // console.dir(state.clickNumber);
    // console.dir(e.target.id);
    console.log(element.id);
    console.log(element);
    console.log(state.matchedCards);
};
var winStateCheck = function () {
    console.log(state.matchedCards, state.cardsArray.length);
    if (state.matchedCards.length === state.cardsArray.length) {
        victory();
    }
};
function flipBackUnPairedCards() {
    var cards = document.querySelectorAll(".containerGame__card");
    Array.from(cards).forEach(function (card) {
        //@ts-ignore
        card.style.transform = "rotateY(0deg)";
        state.matchedCards = [];
    });
}
var gameOver = function () {
    state.totalFlipsStatist = 0;
    state.totalTime = 0;
    gameOverSound();
    stopMusic();
    hideCards();
    drawMessage();
};
var victory = function () {
    var victory = document.querySelector("#victory");
    var bgMusic = document.querySelector("#creepy");
    state.totalFlipsStatist = 0;
    state.totalTime = 0;
    victory.play();
    bgMusic.pause();
    hideCards();
    winMessage();
};
function hideCards() {
    var deck = document.querySelector(".containerGame");
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
    var winningMessage = document.querySelector("#winningMessage");
    document.querySelector(".title-game").style.display = "block";
    winningMessage.classList.remove("show");
    state.totalFlipsStatist = 0;
    handleStartGame();
}
function winMessage() {
    var winningMessage = document.querySelector("#winningMessage");
    document.querySelector(".title-game").style.display = "none";
    winningMessage.innerHTML = "CONGRATS! <br> You Win!\n                                <img style =\"width: 300px; padding-top: 2.5%; padding-bottom: 1.5%;\" src=\"../img/queen.png\"></img>\n                              <div class=\"message-buttons\"> \n                                <button class=\"statisticBtn\" id=\"restartButton\" onclick=\"handleRestartGame()\">Restart</button>\n                                <button class=\"statisticBtn\" onclick=\"handleToGeneralStatistic()\">Statistics</button>\n                              </div> \n                                ";
    winningMessage.classList.add("show");
}
function drawMessage() {
    var winningMessage = document.querySelector("#winningMessage");
    document.querySelector(".title-game").style.display = "none";
    winningMessage.innerHTML = "Game Over :( <br> Next time surely..!\n                                <img src=\"../img/joker.png\"></img>\n                              <div class=\"message-buttons\">\n                                <button class=\"statisticBtn\" id=\"restartButton\" onclick=\"handleRestartGame()\">Restart</button>\n                                <button class=\"statisticBtn\" onclick=\"handleToGeneralStatistic()\">Statistics</button>\n                              </div> \n                                ";
    winningMessage.classList.add("show");
}
// SOUNDS =====================================================================================
function gameOverSound() {
    var gameOver = document.querySelector("#gameOver");
    gameOver.play();
}
function startMusic() {
    var bgMusic = document.querySelector("#creepy");
    bgMusic.play();
    bgMusic.volume = 0.4;
    bgMusic.loop = true;
}
function stopMusic() {
    var bgMusic = document.querySelector("#creepy");
    bgMusic.pause();
}
function flipMusic() {
    var flip = document.querySelector("#flip");
    flip.play();
}
function matchSound() {
    var match = document.querySelector("#match");
    match.play();
}
function getRootElement() {
    var rootHTML = document.querySelector(".root");
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
    setInterval(function () {
        setTimeout(function () {
            document.querySelector(".smilyImg-players").style.transform =
                "scale(1.5)";
            document.querySelector(".smilyImg-players").style.transition = "all 4s ease";
        }, 4000);
        setTimeout(function () {
            document.querySelector(".smilyImg-players").style.transform =
                "scale(1.0)";
            document.querySelector(".smilyImg-players").style.transition = "all 4s ease";
        }, 6000);
    }, 15000);
}
function pulseGame() {
    setInterval(function () {
        setTimeout(function () {
            document.querySelector(".smilyImg-game").style.transform =
                "scale(1.5)";
            document.querySelector(".smilyImg-game").style.transition =
                "all 4s ease";
        }, 4000);
        setTimeout(function () {
            document.querySelector(".smilyImg-game").style.transform =
                "scale(1.0)";
            document.querySelector(".smilyImg-game").style.transition =
                "all 4s ease";
        }, 6000);
    }, 15000);
}
function pulseStatistic() {
    setInterval(function () {
        setTimeout(function () {
            document.querySelector(".smilyImg-statistic").style.transform = "scale(1.5)";
            document.querySelector(".smilyImg-statistic").style.transition = "all 4s ease";
        }, 4000);
        setTimeout(function () {
            document.querySelector(".smilyImg-statistic").style.transform = "scale(1.0)";
            document.querySelector(".smilyImg-statistic").style.transition = "all 4s ease";
        }, 6000);
    }, 12000);
}
function uid() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
;
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
