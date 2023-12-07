import { data } from "./data.mjs";

const getFirstAndLastNumbers = (item) => {
  const numbersOnly = item
    .split("")
    .filter((char) => {
      return parseInt(char) > 0;
    })
    .join("");

  return numbersOnly;
};

const speltDig = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const swapedDig = (string) => {
  let str;
  str = string.replace(/one/g, "o1e");
  str = str.replace(/two/g, "t2o");
  str = str.replace(/three/g, "t3e");
  str = str.replace(/four/, "f4r");
  str = str.replace(/five/g, "f5e");
  str = str.replace(/six/g, "s6x");
  str = str.replace(/seven/g, "s7n");
  str = str.replace(/eight/g, "e8t");
  str = str.replace(/nine/g, "n9e");
  str = str.replace(/zero/g, "z0o");
  console.log(str);
  return str;
};

const arrayOfDig = data.map((string) => {
  let rep = swapedDig(string);
  rep = swapedDig(rep);
  const charArray = rep.split("");
  const numberArr = charArray
    .filter((item) => getFirstAndLastNumbers(item))
    .join("");
  console.log(typeof numberArr, numberArr, numberArr.length);

  let toRet;
  if (numberArr.length === 0) toRet = "";
  if (numberArr.length === 1) toRet = `${numberArr[0]}${numberArr[0]}`;
  if (numberArr.length === 2) toRet = `${numberArr[0]}${numberArr[1]}`;
  if (numberArr.length > 2)
    toRet = `${numberArr[0]}${numberArr[numberArr.length - 1]}`;
  console.log("toRet", toRet);
  return toRet;
});

const output = arrayOfDig.reduce((acc, number) => {
  return acc + parseInt(number);
}, 0);

console.log(output);

// console.log("42sevenfour13four4".replace(/four/g, "4"));
