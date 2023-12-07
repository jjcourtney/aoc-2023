import { data } from "./data.mjs";

// stage 1

// const gameCheck = Object.keys(data).map((game, index) => {
//   const gameCheck = data[game].map((draw) => {
//     const redOK = draw.red <= 12 || !draw.red;
//     const blueOK = draw.blue <= 14 || !draw.blue;
//     const greenOK = draw.green <= 13 || !draw.green;
//     return {
//       isOK: redOK && blueOK && greenOK,
//       gameNumber: parseInt(game),
//     };
//   });
//   const allOK = gameCheck.every((check) => check.isOK);
//   console.log(`Game ${parseInt(game.slice(4, game.length))} is ${allOK}`);

//   return { allOK, gameNumber: parseInt(parseInt(game.slice(4, game.length))) };
// });

// const filtered = gameCheck.filter((check) => check.allOK);

// const total = filtered.reduce((acc, curr) => {
//   console.log(curr.gameNumber);
//   return (acc += curr.gameNumber);
// }, 0);

// console.log("total", total);

// stage 2

const gameCheck = Object.keys(data).map((game) => {
  const minimum = {
    red: 0,
    blue: 0,
    green: 0,
  };

  data[game].forEach((draw) => {
    if (draw.red > minimum.red) {
      minimum.red = draw.red;
    }
    if (draw.blue > minimum.blue) {
      minimum.blue = draw.blue;
    }
    if (draw.green > minimum.green) {
      minimum.green = draw.green;
    }
  });

  return minimum;
});

const total = gameCheck.reduce((acc, curr) => {
  const power = curr.red * curr.blue * curr.green;
  return acc + power;
}, 0);

console.log(total);
