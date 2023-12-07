import { data } from "./data.mjs";

// const data = [
//   ["32T3K", "765"],
//   ["T55J5", "684"],
//   ["KK677", "28"],
//   ["KTJJT", "220"],
//   ["QQQJA", "483"],
// ];

const numberMapping = {
  A: 14,
  J: 1,
  Q: 12,
  K: 13,
  T: 10,
};

const handTypes = [
  "highCard", // 5 different cards
  "pair", // 4 different cards
  "twoPairs", // 3 different cards
  "threeOfAKind", // 3 different cards
  "fullHouse", // 2 different cards
  "fourOfAKind", // 2 different cards
  "fiveOfAKind", // 1 different cards
];

const changeToNumber = (cards) => {
  return cards.replace(/A|J|Q|K|T/g, (match) => numberMapping[match]);
};

const cardsAsNumbers = data.map((hand, index) => {
  const [cards, score] = hand;
  const cardSplitByDashArray = cards.split("");
  const cardsSplitByDash = cardSplitByDashArray.join("-");
  const cardsNumbersArray = changeToNumber(cardsSplitByDash).split("-");
  const hasJoker =
    cardSplitByDashArray.filter((card) => card === "J").length > 0;

  return {
    cards: cardsNumbersArray,
    score: parseInt(score),
    hasJoker,
    jokers: cardSplitByDashArray.filter((card) => card === "J").length,
  };
});
// console.log(cardsAsNumbers);

const withHandType = cardsAsNumbers.map((hand) => {
  const { cards, score } = hand;
  const setOfCards = new Set(cards);
  //   console.log(setOfCards);

  hand.handType = "";

  // check for high card
  const numberOfDifferentCards = setOfCards.size;
  if (numberOfDifferentCards === 5) {
    hand.handType = "highCard";
    if (hand.hasJoker) {
      hand.handType = "pair";
    }
  }

  // check for pair
  if (numberOfDifferentCards === 4) {
    hand.handType = "pair";
    if (hand.hasJoker) {
      hand.handType = "threeOfAKind";
    }
  }

  // check for 5 of a kind
  if (numberOfDifferentCards === 1) {
    hand.handType = "fiveOfAKind";
  }
  // check for two pairs or three of a kind
  if (numberOfDifferentCards === 3) {
    // check for two pairs
    const numberOfCards = hand.cards.reduce((acc, card) => {
      if (acc[card]) {
        acc[card] += 1;
      } else {
        acc[card] = 1;
      }
      return acc;
    }, {});

    let hasThreeOfAKind = false;
    for (const key in numberOfCards) {
      if (numberOfCards[key] === 3) {
        hasThreeOfAKind = true;
      }
    }
    if (hasThreeOfAKind) {
      hand.handType = "threeOfAKind";
      if (hand.hasJoker) {
        hand.handType = "fourOfAKind";
      }
    } else {
      hand.handType = "twoPairs";
      if (hand.hasJoker) {
        if (hand.jokers === 1) {
          hand.handType = "fullHouse";
        } else if (hand.jokers === 2) {
          hand.handType = "fourOfAKind";
        }
      }
    }
  }

  // check for full house or four of a kind
  if (numberOfDifferentCards === 2) {
    const numberOfCards = hand.cards.reduce((acc, card) => {
      if (acc[card]) {
        acc[card] += 1;
      } else {
        acc[card] = 1;
      }
      return acc;
    }, {});

    let hasFourOfAKind = false;
    for (const key in numberOfCards) {
      if (numberOfCards[key] === 4) {
        hasFourOfAKind = true;
      }
    }
    if (hasFourOfAKind) {
      hand.handType = "fourOfAKind";
    } else {
      hand.handType = "fullHouse";
    }
    if (hand.hasJoker) {
      hand.handType = "fiveOfAKind";
    }
  }

  return hand;
});

let handsObject = {
  pair: [],
  twoPairs: [],
  threeOfAKind: [],
  fullHouse: [],
  fourOfAKind: [],
  fiveOfAKind: [],
  highCard: [],
};

withHandType.forEach((hand, index) => {
  const { handType } = hand;
  if (!handTypes.includes(handType)) console.log(handType);
  handsObject[handType].push(hand);
});

for (const key in handsObject) {
  handsObject[key] = handsObject[key].sort((handa, handb) => {
    if (handa.cards[0] !== handb.cards[0]) {
      return handa.cards[0] - handb.cards[0];
    } else if (handa.cards[1] !== handb.cards[1]) {
      return handa.cards[1] - handb.cards[1];
    } else if (handa.cards[2] !== handb.cards[2]) {
      return handa.cards[2] - handb.cards[2];
    } else if (handa.cards[3] !== handb.cards[3]) {
      return handa.cards[3] - handb.cards[3];
    } else if (handa.cards[4] !== handb.cards[4]) {
      return handa.cards[4] - handb.cards[4];
    }
  });
}
// handsObject.highCard = handsObject.highCard.sort((handa, handb) => {});

const sortedArrayOfHands = [
  ...handsObject.highCard,
  ...handsObject.pair,
  ...handsObject.twoPairs,
  ...handsObject.threeOfAKind,
  ...handsObject.fullHouse,
  ...handsObject.fourOfAKind,
  ...handsObject.fiveOfAKind,
];

// console.log(handsObject.fourOfAKind);

const score = sortedArrayOfHands.reduce((acc, hand, index) => {
  // console.log(acc);
  // console.log(
  //   "score ",
  //   hand.score,
  //   " index ",
  //   index + 1,
  //   "cards ",
  //   hand.cards,
  //   "total ",
  //   hand.score * (index + 1),
  //   "hand type ",
  //   hand.handType
  // );
  return (acc += hand.score * (index + 1));
}, 0);
// console.log(sortedArrayOfHands);

console.log(score);

// too low 249982735 / 250010034
