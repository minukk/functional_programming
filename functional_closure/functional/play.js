import {
  tap,
  print,
  forEach,
  unary,
  once,
  memoized,
  objectAssign,
} from "../lib/es8-functional";

tap("fun")((it) => print(`value: ${it}`));

forEach([1, 2, 3], (a) =>
  tap(a)(() => {
    print(`arr${a}: ${a}`);
  })
);

print(["1", "2", "3"].map(parseInt));

print(["1", "2", "3"].map((item) => parseInt(item)));

print(["1", "2", "3"].map(unary(parseInt)));

const doPayment = once(() => {
  return "Payment is done";
});

print(doPayment());
print(doPayment());

const factorial = (n) => {
  if (n === 0) return 1;
  return n * factorial(n - 1);
};

print(factorial(5));

let fastFactorial = memoized((n) => {
  if (n === 0) return 1;
  return n * fastFactorial(n - 1);
});

const name = { name: "minuk" };
const age = { age: 29 };
const sex = { sex: "M" };

const assign = objectAssign(name, age, sex);
// const assign = Object.assign(name, age, sex);
print(assign);
