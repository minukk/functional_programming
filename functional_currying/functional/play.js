import { print, curry, setTimeoutWrapper, partial } from "../lib/utils";

const variadic = (a, ...variadic) => {
  print(a);
  print(variadic);
};

variadic(1, 2, 3, 4);

const addCurried = (x) => (y) => x + y;
const add = (x, y) => x + y;

print(addCurried(1)(3));

let autoCurriedAdd = curry(add);
print(autoCurriedAdd(5, 3));

const multiply = (x, y, z) => x * y * z;

print(curry(multiply)(2, 3, 5));
print(curry(multiply)(3)(4)(5));

const loggerHelper = (mode, initMessage, errorMessage, lineNo) => {
  if (mode === "DEBUG")
    console.debug(initMessage, errorMessage + "at line: " + lineNo);
  else if (mode === "ERROR")
    console.error(initMessage, errorMessage + "at line: " + lineNo);
  else if (mode === "WARN")
    console.warn(initMessage, errorMessage + "at line: " + lineNo);
  else throw "Wrong mode";
};

let errorLogger = curry(loggerHelper)("ERROR")("Error");
let debugLogger = curry(loggerHelper)("DEBUG")("Debug");
let warnLogger = curry(loggerHelper)("WARN")("Warn");

errorLogger("Error Message", 21);
debugLogger("Debug Message", 30);
warnLogger("Warn Message", 41);

let match = curry((expr, str) => str.match(expr));
let hashNumber = match(/[0-9]+/);
let filter = curry((f, arr) => arr.filter(f));
let findNumberInArray = filter(hashNumber);

print(findNumberInArray(["js", "number2"]));

let map = curry((f, arr) => arr.map(f));
let squareAll = map((x) => x * x);

print(squareAll([1, 2, 3]));

const delayTenMs = curry(setTimeoutWrapper)(10);
delayTenMs(() => print("Do X task"));
delayTenMs(() => print("Do Y task"));

const delayTwendyMs = partial(setTimeout, undefined, 20);
delayTwendyMs(() => print("Do Y Task"));

let obj = { foo: "bar", bar: "foo" };
const prettyPrintJSON = partial(JSON.stringify, undefined, null, 2);
// prettyPrintJSON(obj);
print(prettyPrintJSON(obj));
