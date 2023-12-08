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

while (nextLocation != "ZZZ") {
  goToNextLocation();
  counter++;
}
console.log(counter);
