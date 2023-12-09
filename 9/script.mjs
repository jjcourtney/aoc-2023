import { data } from "./data.mjs";

// const data = [
//   [0, 3, 6, 9, 12, 15],
//   [1, 3, 6, 10, 15, 21],
//   [10, 13, 16, 21, 30, 45],
// ];

const iterateOverSequence = (currentSequence) => {
  const lastNumber = [currentSequence[currentSequence.length - 1]];

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

      lastNumber.unshift(nextLayer[nextLayer.length - 1]);

      return arrayRecursive(nextLayer);
    }
  };

  arrayRecursive(currentSequence);

  return lastNumber;
};

const allHistories = [];
const getHistory = (array) => {
  const lastNumbers = iterateOverSequence(array);
  if (!lastNumbers) return;

  const total = lastNumbers.reduce((acc, cur) => {
    return acc + cur;
  }, 0);

  allHistories.push(total);
};

data.forEach((array) => {
  getHistory(array);
});

const test = allHistories.filter((element) => {
  return element < 0;
});
const part1 = allHistories.reduce((acc, cur) => {
  return acc + cur;
}, 0);

console.log("part1", part1); // 1995001648
