export const tap = (value) => (fn) => (
  typeof fn === "function" && fn(value), console.log(value)
);

export const print = (arg) => console.log(arg);

export const forEach = (arr, fn) => {
  for (let i = 0; i < arr.length; ++i) {
    fn(arr[i]);
  }
};

export const unary = (fn) => (fn.length === 1 ? fn : (arg) => fn(arg));

export const once = (fn) => {
  let done = false;

  return () => {
    return done ? null : ((done = true), fn.apply(this, arguments));
  };
};

export const memoized = (fn) => {
  const lookupTable = {};

  return (arg) => lookupTable[arg] || (lookupTable[arg] = fn(arg));
};

export function objectAssign(target, source) {
  const to = {};

  for (let i = 0; i < arguments.length; ++i) {
    let from = arguments[i];
    let keys = Object.keys(from);

    for (let j = 0; j < keys.length; ++j) {
      to[keys[j]] = from[keys[j]];
    }
  }

  return to;
}
