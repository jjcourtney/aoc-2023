import { data } from "./data.mjs";

// const data = [
//   "41 48 83 86 17 | 83 86  6 31 17  9 48 53",
//   "13 32 20 16 61 | 61 30 68 82 17 32 24 19",
//   " 1 21 53 59 44 | 69 82 63 72 16 21 14  1",
//   "41 92 73 84 69 | 59 84 76 51 58  5 54 83",
//   "87 83 26 28 32 | 88 30 70 12 93 22 82 36",
//   "31 18 13 56 72 | 74 77 10 23 35 67 36 11",
// ];

const splitByCard = (cards) => {
  const cardArray = cards.split("|");
  const numbers = cardArray[0].split(" ").filter((number) => number !== "");
  const winningNumber = cardArray[1]
    .split(" ")
    .filter((number) => number !== "");

  return [numbers, winningNumber];
};

const seperatedArray = [];

data.forEach((element) => {
  seperatedArray.push(splitByCard(element));
});

const getWins = () => {
  const winsArray = [];
  seperatedArray.forEach((element) => {
    const numbers = element[0];
    const winningNumber = element[1];

    const result = numbers.filter((number) => winningNumber.includes(number));

    winsArray.push(result.length);
  });
  return winsArray;
};

let winsArray = getWins();
console.log(winsArray);
// import fs from "fs";
// fs.writeFile(
//   "./my.json",

//   JSON.stringify(getWins()),

//   function (err) {
//     if (err) {
//       console.error("Crap happens");
//     }
//   }
// );

// const points = getWins().reduce((a, b) => a + b, 0);
// console.log(points);

/**
 *
 * {
 *  duplicates: 0,
 * wins: 0,
 * }
 */

const arrayOfObjects = winsArray.map((element, index) => {
  return {
    game: `Card ${index + 1}`,
    wins: element,
    duplicates: 1,
  };
});

let numOfCards = 0;
arrayOfObjects.forEach((element, index) => {
  const duplicates = element.duplicates;
  numOfCards += duplicates;
  console.log(duplicates, element.game);
  for (let i = 0; i < duplicates; i++) {
    // console.log("card", card, "element", element.duplicates);
    for (let j = 0; j < element.wins; j++) {
      //   console.log(index + i);
      if (element.wins > 0 && index < arrayOfObjects.length - 1) {
        arrayOfObjects[index + j + 1].duplicates += 1;
      }
    }
  }
});
console.log(numOfCards);
import fs from "fs";
fs.writeFile(
  "./my.json",

  JSON.stringify(arrayOfObjects),

  function (err) {
    if (err) {
      console.error("Crap happens");
    }
  }
);

// 107791 too low
