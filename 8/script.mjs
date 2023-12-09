import { data } from "./data.mjs";

// const data = {
//   instuctions: "RL",
//   locations: {
//     AAA: ["BBB", "CCC"],
//     BBB: ["DDD", "EEE"],
//     CCC: ["ZZZ", "GGG"],
//     DDD: ["DDD", "DDD"],
//     EEE: ["EEE", "EEE"],
//     GGG: ["GGG", "GGG"],
//     ZZZ: ["ZZZ", "ZZZ"],
//   },
// };

let currentInstuctionsIndex = 0;
let currentInstuctions = data.instuctions[0];
let currentLocation = data.locations.AAA;
let counter = 0;
let nextLocation = "";

const goToNextLocation = () => {
  const [L, R] = currentLocation;
  currentInstuctionsIndex++;
  if (currentInstuctionsIndex >= data.instuctions.length) {
    currentInstuctionsIndex = 0;
  }

  nextLocation = currentInstuctions === "L" ? L : R;
  currentLocation = data.locations[nextLocation];
  currentInstuctions = data.instuctions[currentInstuctionsIndex];
};

const part1 = () => {
  while (nextLocation != "ZZZ") {
    goToNextLocation();
    counter++;
  }
  console.log("Part 1: ", counter);
};
part1();

const part2 = () => {
  const startLocations = Object.keys(data.locations).filter((key) => {
    return key[2] === "A";
  });
  const endLocations = Object.keys(data.locations).filter((key) => {
    return key[2] === "Z";
  });
  console.log("startLocations", startLocations, "endLocations", endLocations);
};
part2();
