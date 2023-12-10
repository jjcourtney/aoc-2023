import { data } from "./data.mjs";

// | is a vertical pipe connecting north and south.
// - is a horizontal pipe connecting east and west.
// L is a 90-degree bend connecting north and east.
// J is a 90-degree bend connecting north and west.
// 7 is a 90-degree bend connecting south and west.
// F is a 90-degree bend connecting south and east.
// . is ground; there is no pipe in this tile.
// S is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.

const mappingSymbols = {
  "|": {
    name: "vertical",
    isNext: (direction, x, y) => {
      if (direction === "north") {
        return { x: x, y: y + 1, direction: "north" };
      } else if (direction === "south") {
        return { x: x, y: y - 1, direction: "south" };
      }
      throw new Error("Invalid direction for vertical pipe |");
    },
  },

  "-": {
    name: "horizontal",
    isNext: (direction, x, y) => {
      if (direction === "east") {
        return { x: x + 1, y: y, direction: "east" };
      } else if (direction === "west") {
        return { x: x - 1, y: y, direction: "west" };
      }
      throw new Error("Invalid direction for horizontal pipe -");
    },
  },
  L: {
    name: "north-east",
    isNext: (direction, x, y) => {
      if (direction === "south") {
        return { x: x + 1, y: y - 1, direction: "east" };
      } else if (direction === "west") {
        return { x: x - 1, y: y + 1, direction: "north" };
      }
      throw new Error("Invalid direction for north-east pipe L");
    },
  },
  J: {
    name: "north-west",
    isNext: (direction, x, y) => {
      if (direction === "south") {
        return { x: x - 1, y: y - 1, direction: "west" };
      } else if (direction === "east") {
        return { x: x + 1, y: y + 1, direction: "north" };
      }
      throw new Error("Invalid direction for north-west pipe J");
    },
  },
  7: {
    name: "south-west",
    isNext: (direction, x, y) => {
      if (direction === "north") {
        return { x: x - 1, y: y + 1, direction: "west" };
      } else if (direction === "east") {
        return { x: x + 1, y: y - 1, direction: "south" };
      }
      throw new Error("Invalid direction for south-west pipe 7");
    },
  },
  F: {
    name: "south-east",
    isNext: (direction, x, y) => {
      if (direction === "north") {
        return { x: x + 1, y: y + 1, direction: "east" };
      } else if (direction === "west") {
        return { x: x - 1, y: y - 1, direction: "south" };
      }
      throw new Error("Invalid direction for south-east pipe F");
    },
  },
  ".": {
    name: "ground",
    isNext: (direction, x, y) => {
      throw new Error("Invalid direction for ground pipe .");
    },
  },
  S: {
    name: "starting",
    isNext: (direction, x, y) => {
      return { isEnd: true };
    },
  },
};

let startingPoint;
data.forEach((item, xCoord) => {
  item.split("").forEach((letter, yCoord) => {
    if (letter === "S") {
      startingPoint = { x: xCoord, y: yCoord };
    }
  });
});

console.log(startingPoint);
