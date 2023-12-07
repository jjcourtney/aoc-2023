import { data } from "./data.mjs";

// const data = [{
//     time: 7,
//     distance: 9
// }, {
//     time: 15,
//     distance: 40
// }, {
//     time: 30,
//     distance: 200
// }];

const calcMarginOfError = ({ time, distance }) => {
  let numberOfOptions = 0;

  for (let pressed = 0; pressed < time; pressed++) {
    const timeTravelling = time - pressed;
    const distanceTravelled = timeTravelling * pressed;

    if (distanceTravelled >= distance) numberOfOptions++;
  }
  return numberOfOptions;
};

const part1 = data.reduce((acc, gameData) => {
  return acc * calcMarginOfError(gameData);
}, 1);

console.log("Part 1: ", part1);

const part2Data = data.reduce(
  (acc, gameData) => {
    return {
      time: parseInt(`${acc.time}${gameData.time}`),
      distance: parseInt(`${acc.distance}${gameData.distance}`),
    };
  },
  { time: 0, distance: 0 }
);

console.log("Part 2: ", calcMarginOfError(part2Data));
