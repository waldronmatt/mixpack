/* eslint-disable no-console */
import "../scss/index.scss";
import "../css/index.css";
import "./polyfills";

// https://github.com/BulbEnergy/jest-mock-examples/tree/master/class-mock

import { BasicMath } from "./BasicMath";
import { ComplexMath } from "./ComplexMath";

const basicMath = new BasicMath();
const complexMath = new ComplexMath();

console.log(
  "%c Hello Next-Gen JavaScript! ",
  "background: yellow; color: black; display: block;"
);
console.log(`1 + 1 = ${basicMath.sum(1, 1)}`);
console.log(`10 / 2 = ${basicMath.divide(10, 2)}`);
console.log(`(1 + 1) / 2 = ${complexMath.avg(1, 1)}`);

console.log(
  "%c Sass styling on desktop breakpoint! ",
  "background: pink; color: black; display: block;"
);

console.log(
  "%c Next-Gen CSS on mobile breakpoint! ",
  "background: lightblue; color: black; display: block;"
);
