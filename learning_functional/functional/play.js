import {
  forEach,
  forEachObject,
  unless,
  print,
  times,
} from "../lib/es8-functional";

const array = [1, 2, 3];
forEach(array, (data) => console.log(data));

let tellType = (arg) => {
  if (typeof arg === "function") arg();
  else console.log("The passed data is " + arg);
};

let data = 1;
let dataFn = () => {
  console.log("Function!!!");
};

tellType(data);
tellType(dataFn);

let object = { a: 1, b: 2 };
forEachObject(object, (k, v) => console.log(`${k}: ${v}`));

forEach([1, 2, 3, 4, 5, 6, 7, 8], (num) => {
  unless(num % 2, () => {
    print(`${num} is even`);
  });
});

times(100, (num) => {
  unless(num % 2, () => {
    print(`${num} is even`);
  });
});
