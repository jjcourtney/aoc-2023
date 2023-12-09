import { data } from "./data.mjs";

// const data = [
//   [0, 3, 6, 9, 12, 15],
//   [1, 3, 6, 10, 15, 21],
//   [10, 13, 16, 21, 30, 45],
// ];

const iterateOverSequence = (currentSequence) => {
  const lastNumbers = [currentSequence[currentSequence.length - 1]];
  const firstNumbers = [currentSequence[0]];

  const arrayRecursive = (arrayLayer) => {
    const allZero = arrayLayer.every((element) => element === 0);

    if (!allZero) {
      // check next layer
      const nextLayer = [];
      arrayLayer.forEach((element, index, array) => {
        if (index < array.length - 1) {
          const nextElement = array[index + 1] - element;
          nextLayer.push(nextElement);
        }
        return;
      });

      lastNumbers.unshift(nextLayer[nextLayer.length - 1]);
      firstNumbers.unshift(nextLayer[0]);

      return arrayRecursive(nextLayer);
    }
  };

  arrayRecursive(currentSequence);

  return { firstNumbers, lastNumbers };
};

const allHistories = [];
const getHistory = (array) => {
  const numbers = iterateOverSequence(array);
  if (!numbers) return;

  let firstTotal = 0;
  for (let index = 0; index < numbers.firstNumbers.length; index++) {
    var nextHistory = numbers.firstNumbers[index] - firstTotal;
    firstTotal = nextHistory;
  }

  const lastTotal = numbers.lastNumbers.reduce((acc, cur) => {
    return acc + cur;
  }, 0);

  allHistories.push({ firstTotal, lastTotal });
};

data.forEach((array) => {
  getHistory(array);
});

const part1 = allHistories.reduce((acc, cur) => {
  return acc + cur.lastTotal;
}, 0);

const part2 = allHistories.reduce((acc, cur) => {
  return acc + parseInt(cur.firstTotal);
}, 0);

console.log("Part1: ", part1); // 1995001648
console.log("Part2: ", part2); // 988
