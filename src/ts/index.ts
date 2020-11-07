/* eslint-disable no-console */

// https://github.com/BulbEnergy/jest-mock-examples/tree/master/class-mock

import { BasicMath } from "./test-scripts/BasicMath";
import { ComplexMath } from "./test-scripts/ComplexMath";

const basicMath = new BasicMath();
const complexMath = new ComplexMath();

console.log(
  "%c Hello TypeScript! ",
  "background: darkblue; color: white; display: block;"
);
console.log(`2 + 2 = ${basicMath.sum(2, 2)}`);
console.log(`20 / 2 = ${basicMath.divide(20, 2)}`);
console.log(`(2 + 2) / 2 = ${complexMath.avg(2, 2)}`);
