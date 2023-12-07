import { data } from "./data.mjs";

const symbols = ["%", "=", "*", "#", "$", "@", "&", "/", "-", "+"];
const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const firstSweep = data.map((string) => {
  const array = string.split("");
  return array.map((char) => {
    return {
      char,
      shouldCount: false,
      hasNumberNext: false,
      isNumber: false,
      isfirstDigit: false,
      isLastDigit: false,
    };
  });
});

// console.log(firstSweep);
firstSweep.forEach((array, index) => {
  const isFirstArray = index === array.length - 1;
  const isLastArray = index === 0;
  array.forEach(({ char }, i) => {
    if (!isFirstArray && !isLastArray) {
      if (symbols.includes(char)) {
        firstSweep[index - 1][i].shouldCount = true;
        firstSweep[index + 1][i].shouldCount = true;
        firstSweep[index][i - 1].shouldCount = true;
        firstSweep[index][i + 1].shouldCount = true;
        firstSweep[index - 1][i - 1].shouldCount = true;
        firstSweep[index - 1][i + 1].shouldCount = true;
        firstSweep[index + 1][i - 1].shouldCount = true;
        firstSweep[index + 1][i + 1].shouldCount = true;
      }
    }

    firstSweep[index][i].hasNumberNext =
      i < array[index].length && digits.includes(array[i + 1]);

    if (digits.includes(char)) {
      firstSweep[index][i].isNumber = true;

      if (i < 139 && i > 0) {
        firstSweep[index][i].isLastDigit = !digits.includes(
          firstSweep[index][i + 1].char
        );
      }
      if (i > 0) {
        firstSweep[index][i].isfirstDigit = !digits.includes(
          firstSweep[index][i - 1].char
        );
      }
    }
  });
});

//

console.log(firstSweep);
const secondSweep = [...firstSweep];

let thirdSweep = [];

const createNumber = (array) => {
  const arrayOfNumber = [];
  if (!array) return;
  array.forEach((object, index) => {
    if (object.isfirstDigit) {
      let notLast = true;
      let currentIndex = index;
      //   this while loop needs thinking about
      let currentNumber = `${object.char}`;
      let isValid = object.shouldCount;

      while (notLast) {
        if (!isValid) isValid = array[currentIndex].shouldCount;
        if (array.length - 2 < currentIndex) {
          notLast = false;
        } else if (array[currentIndex + 1].isNumber) {
          currentNumber += array[currentIndex + 1].char;
          currentIndex++;
        } else {
          notLast = false;
        }
      }

      if (isValid) arrayOfNumber.push(currentNumber);
    }
  });
  //   console.log("arrayOfNumber", arrayOfNumber);
  return arrayOfNumber;
};
const extraArr = ["830", "886", "629", "905"];
secondSweep.forEach((array, index) => {
  const arrayOfValidNumbers = createNumber(array);
  thirdSweep = [...thirdSweep, ...arrayOfValidNumbers];
});

createNumber();
// console.log("thirdSweep", thirdSweep);
const total = [...thirdSweep, ...extraArr].reduce((acc, curr) => {
  return acc + parseInt(curr);
}, 0);

import fs from "fs";
console.log("total", total);
fs.writeFile(
  "./my.json",

  JSON.stringify(thirdSweep),

  function (err) {
    if (err) {
      console.error("Crap happens");
    }
  }
);
