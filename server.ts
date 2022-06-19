console.log("Connected!");
import uid from "./helpers";
import express from "express";
const app = express();
const port = process.env.PORT || 4006;
app.use(express.static("public"));
app.use(express.json());

interface Game {
  cards: Array<Card>;
  players: Array<Player>;
}

interface Player {
  name: string
  password: any
  totalRounds: number;
  totalFlip: number,
  timeStatist: number,
  playerID: string;
}

interface Card {
  url: string;
  cardID: number;
}

const game = {
  cards: [
    {
      url: "./img/1.jpg",
      cardID: 1,
    },
    {
      url: "./img/2.jpg",
      cardID: 2,
    },
    {
      url: "./img/3.jpg",
      cardID: 3,
    },
    {
      url: "./img/4.jpg",
      cardID: 4,
    },
    {
      url: "./img/5.jpg",
      cardID: 5,
    },
    {
      url: "./img/6.jpg",
      cardID: 6,
    },
    {
      url: "./img/7.jpg",
      cardID: 7,
    },
    {
      url: "./img/8.jpg",
      cardID: 8,
    },
  ],
  players: [
    {
      name: "Ryu",
      password: "123",
      totalRounds: 0,
      totalFlip: 0,
      timeStatist: 0,
      playerID: uid(),
    },
  ],
};

app.post("/get-deck", (req, res) => {
  try {
    const pairedCardArray = [];
    shuffleCards(game.cards);

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < game.cards.length; j++) {
        pairedCardArray.push(game.cards[j]);
      }
    }

    let players = game.players;

    let lastLoggedInPlayer = game.players[game.players.length - 1];
    console.log('this is the last player: ', lastLoggedInPlayer);
    
    res.status(200).send({ pairedCardArray, players, lastLoggedInPlayer });

    console.log("pairedArray is", pairedCardArray.length);
    console.log(pairedCardArray, players, lastLoggedInPlayer);
    
  } catch (error) {
    res.send({ error: error.message });
  }
});

app.post("/player-statistic-update", (req, res) => {
  const { playerID, totalFlip } = req.body;
  let players = game.players;
  const index: number = game.players.findIndex(player => player.playerID === playerID);
  
  if(index >= 0) {
    players[index].totalFlip = totalFlip;
  } 
  console.log(players);
  res.send(players)
});


app.post("/player-add", (req, res) => {
  try {
    const { name, password } = req.body;
    
    if (!name) throw new Error("name is required");
    if (!password) throw new Error("password is required");

    const player = { name, password, totalRounds: 0, totalFlip: 0, timeStatist: 0, playerID: uid() };
    game.players.push(player);

    res.send(game.players);
    console.log(req.body);

  } catch (error) {
    res.send({ error: error.message });
  }
});

app.get("/check-if-exist", (req, res) => {
  try {
    
    const name = req.query.name;
    const password = req.query.password;

    if (!name) throw new Error("name is required");
    if (!password) throw new Error("name is required");

    if (name && password) {
      console.log(name, password);
      const filteredPlayers = game.players.filter((player) => player.name === name && player.password === password);

      console.log(`the name is ${name} and the password  ${password}`);
      res.send({ filteredPlayers });
      res.send(true);
    } else {
      res.send(false);
    }

    console.log(req.query);
  } catch (error) {
    res.send({ error: error.message });
  }
});

app.get("/check-match", (req, res) => {
  const { card1, card2 } = req.query;
  console.log(req.query);
  console.log(card1);
  console.log(card2);

  if (card1 && card2) {
    console.log(`the fist number is ${card1} and the second  ${card2}`);

    if (card1 === card2) {
      res.send(true);
    } else {
      res.send(false);
    }
  }
});

function shuffleCards(cards) {
  for (let i = 0; i < cards.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = cards[i];
    cards[i] = cards[j];
    cards[j] = temp;
  }
}

app.listen(port, () => {
  console.log(`Express is listening at ${port}`);
});



// app.get("/check-if-exist", (req, res) => {
//   // const { name, password } = req.query;
//   const name = req.query.name;
//   const password = req.query.password;
//   if (!name) throw new Error("name is required");
//   if (!password) throw new Error("name is required");

//   if (name && password) {
//     console.log(name, password);
//     const filteredPlayers = players.filter(
//       (player) => player.name === name && player.password === password
//     );

//     console.log(`the name is ${name} and the password  ${password}`);
//     res.send(true);
//     res.send(filteredPlayers);
//   } else {
//     res.send(false);
//   }

//   console.log(req.query);
// });

// app.post("/get-deck", (req, res) => {
//   try {
//     const pairedCardArray = [];
//     shuffleCards(cards);

//     for (let i = 0; i < 2; i++) {
//       for (let j = 0; j < cards.length; j++) {
//         pairedCardArray.push(cards[j]);
//       }
//     }

//     res.status(200).send({ pairedCardArray, players, statistic });

//     console.log(pairedCardArray, players, statistic);
//     console.log("pairedArray is", pairedCardArray.length);
//     console.log(pairedCardArray);
//   } catch (error) {
//     res.send({ error: error.message });
//   }
// });

// app.post("/player-add", (req, res) => {
//   try {
//     const { playerID, name, password } = req.body;
//     if (!name) throw new Error("name is required");
//     const player = { name, password, playerID: uid() };
//     players.push(player);
//     res.send(players);
//   } catch (error) {
//     res.send({ error: error.message });
//   }
// });

// app.patch("/player-name-update", (req, res) => {
//   try {
//     const { newPlayerID, name } = req.body;
//     const index = players.findIndex(
//       (player) => player.playerID === newPlayerID
//     );

//     if (index >= 0) {
//       players[index].name = name;
//     } else {
//       throw new Error(`Didnt find any player with id ${newPlayerID}`);
//     }

//     res.send({ players });
//     console.log(players);
//     console.log(newPlayerID);
//   } catch (error) {
//     res.send({ error: error.message });
//   }
// });

// ================================================================

// function shuffleCards(cards) {
//   return cards.sort(() => 0.5 - Math.random());
// }

// pairID =======================================================

// function createPairID(cardUrls) {

//   let tempPairObj = {};

//   for (let i = 0; i < cardUrls.length; i++) {
//     tempPairObj = { url: cardUrls[i], pairID: uid() }; // when such an Obj is created => it sent to 'createDobleCards(tempPairObj)'
//     createDobleCards(tempPairObj);
//   }

// }
// createPairID(cardUrls);

// function createDobleCards(tempPairObj) {

//   const doubleArray = [];

//   for (let i = 0; i <= 2; i++) {

//     const tempDoubleObj = {
//       url: tempPairObj.url,
//       pairID: tempPairObj.pairID,
//       uniqueID: uid()
//     };

//     doubleArray.push(tempDoubleObj);
//   }

//   console.log(doubleArray);

//   return doubleArray;

// }

// =========================================================

// const cardDesk = doubleCards(cards);

// function doubleCards(cards) {
//   let doubleArray = [];

//   cards.forEach((card) => {
//     const tempObj = { name: card.name, url: card.url, pairID: uid() };
//     const card1: any = Object.assign({}, tempObj);
//     const card2: any = Object.assign({}, tempObj);
//     card1.uniqueID = uid();
//     card2.uniqueID = uid();

//     doubleArray = [...doubleArray, card1, card2];
//   });

//   return doubleArray;
// }

// =====================================================================================
