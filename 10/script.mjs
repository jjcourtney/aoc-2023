import { data } from "./data.mjs";

// moving north is -1 in y
// moving south is +1 in y
// moving east is +1 in x
// moving west is -1 in x

const steppedOn = [];

let continueLoop = true;

const mappingSymbols = {
  "|": {
    name: "vertical",
    isNext: (direction, x, y) => {
      if (direction === "north") {
        return { x: x, y: y - 1, direction: "north" };
      }
      if (direction === "south") {
        return { x: x, y: y + 1, direction: "south" };
      }
      throw new Error(
        `${direction} is an invalid direction for vertical pipe | at ${x}, ${y}`
      );
    },
  },

  "-": {
    name: "horizontal",
    isNext: (direction, x, y) => {
      if (direction === "east") {
        return { x: x + 1, y, direction: "east" };
      }
      if (direction === "west") {
        return { x: x - 1, y, direction: "west" };
      }
      throw new Error(
        `${direction} is an invalid direction for horizontal pipe - at ${x}, ${y}`
      );
    },
  },
  L: {
    name: "north-east",
    isNext: (direction, x, y) => {
      if (direction === "south") {
        return { x: x + 1, y, direction: "east" };
      }
      if (direction === "west") {
        return { x, y: y - 1, direction: "north" };
      }
      throw new Error(
        `${direction} is an invalid direction for north-east pipe L at ${x}, ${y}`
      );
    },
  },
  J: {
    name: "north-west",
    isNext: (direction, x, y) => {
      if (direction === "south") {
        return { x: x - 1, y, direction: "west" };
      }
      if (direction === "east") {
        return { x, y: y - 1, direction: "north" };
      }
      throw new Error(
        `${direction} is an invalid direction for north-west pipe J at ${x}, ${y}`
      );
    },
  },
  7: {
    name: "south-west",
    isNext: (direction, x, y) => {
      if (direction === "north") {
        return { x: x - 1, y: y, direction: "west" };
      }
      if (direction === "east") {
        return { x, y: y + 1, direction: "south" };
      }
      throw new Error(
        `${direction} is an invalid direction for south-west pipe 7 at ${x}, ${y}`
      );
    },
  },
  F: {
    name: "south-east",
    isNext: (direction, x, y) => {
      if (direction === "north") {
        return { x: x + 1, y, direction: "east" };
      } else if (direction === "west") {
        return { x, y: y + 1, direction: "south" };
      }
      throw new Error(
        `${direction} is an invalid direction for south-east pipe F at ${x}, ${y}`
      );
    },
  },
  ".": {
    name: "ground",
    isNext: (direction, x, y) => {
      throw new Error("Invalid direction for ground .");
    },
  },
  S: {
    name: "starting",
    isNext: (direction, x, y) => {
      continueLoop = false;
    },
  },
};

let nextPos = { x: 29, y: 20, direction: "north" };

const findNext = (direction, x, y, symbol) => {
  const pipe = mappingSymbols[symbol];
  if (!pipe) {
    throw new Error(`Invalid symbol ${symbol}`);
  }
  return pipe.isNext(direction, x, y);
};

let counter = 0;

while (continueLoop) {
  const { x, y, direction } = nextPos;
  const symbol = data[y][x];

  const next = findNext(direction, x, y, symbol);

  nextPos = next;
  // console.log(nextPos, symbol, counter);

  counter++;
  steppedOn.push(`${x},${y}`);
}

// console.log("Part 1: ", counter / 2);

const unique = data.map((item, yCoord) => {
  return item
    .split("")
    .map((letter, xCoord) => {
      if (steppedOn.includes(`${xCoord},${yCoord}`)) {
        return ".";
      } else {
        return letter;
      }
    })
    .join("");
});
// console.log(unique);

const uniqueNoSingle = unique.map((item, yCoord) => {
  return item
    .split("")
    .map((letter, xCoord) => {
      if (
        xCoord === 0 ||
        yCoord === 0 ||
        xCoord === item.length - 1 ||
        yCoord === unique.length - 1
      )
        return letter;
      const isSingle =
        unique[yCoord][xCoord + 1] === "." &&
        unique[yCoord][xCoord - 1] === "." &&
        unique[yCoord + 1][xCoord] === "." &&
        unique[yCoord - 1][xCoord] === ".";
      if (isSingle) {
        return ".";
      } else {
        return letter;
      }
    })
    .join("");
});
// // console.log(uniqueNoSingle);

const part2Loop = () => {
  const posibleStarts = [];
  const steppedOnPart2 = [];
  let max = { x: 0, y: 0, counter: 0, direction: "north" };
  uniqueNoSingle.forEach((item, yCoord) => {
    continueLoop = true;
    item.split("").forEach((letter, xCoord) => {
      if (letter === ".") return;
      ["north", "south", "east", "west"].forEach((direction) => {
        counter = 0;
        // stop coming in from edges of map
        if (xCoord === 0 && direction === "east") return;
        if (yCoord === 0 && direction === "south") return;
        if (xCoord === item.length - 1 && direction === "west") return;
        if (yCoord === uniqueNoSingle.length - 1 && direction === "north")
          return;

        try {
          const starting = `${xCoord},${yCoord}-${direction}`;

          let nextPos = { x: xCoord, y: yCoord, direction };

          while (continueLoop) {
            steppedOnPart2.push(
              `${nextPos.x},${nextPos.y}-${nextPos.direction}`
            );
            // console.log("posibleStarts", posibleStarts);
            const { x, y, direction } = nextPos;
            const symbol = uniqueNoSingle[y][x];

            const next = findNext(direction, x, y, symbol);

            nextPos = next;

            // console.log(nextPos, symbol, counter);
            if (`${x},${y}-${direction}` === starting && counter > 0) {
              posibleStarts.push({ x: xCoord, y: yCoord, direction, counter });
              if (counter > max.counter)
                max = { x: xCoord, y: yCoord, direction, counter };
              continueLoop = false;
            }
            counter++;
          }
        } catch (e) {
          return;
        }
      });
    });
  });
  console.log("max", max);
  return posibleStarts;
};
// console.log("posible", part2Loop());
part2Loop();

// let part2Counter = 0;
// part2Loop().forEach((item) => {
//   nextPos = item;
//   continueLoop = true;
//   while (continueLoop) {
//     const { x, y, direction } = nextPos;
//     const symbol = uniqueNoSingle[y][x];

//     const next = findNext(direction, x, y, symbol);

//     nextPos = next;
//     // console.log(nextPos, symbol, counter);

//     if

//     part2Counter++;
//   }
// });
