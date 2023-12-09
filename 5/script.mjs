import { data } from "./data.mjs";

Object.keys(data).forEach((element) => {
  console.log(data[element].length);
});
