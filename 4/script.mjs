import { data } from "./data.mjs";

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
  for (let i = 0; i < duplicates; i++) {
    for (let j = 0; j < element.wins; j++) {
      if (element.wins > 0 && index < arrayOfObjects.length - 1) {
        arrayOfObjects[index + j + 1].duplicates += 1;
      }
    }
  }
});
console.log("Part 2: ", numOfCards);
