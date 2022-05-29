export const print = (arg) => console.log(arg);

export const map = (array, fn) => {
  let result = [];

  for (const value of array) result.push(fn(value));

  return result;
};

export const filter = (array, fn) => {
  let result = [];

  for (const value of array) fn(value) ? result.push(value) : undefined;

  return result;
};

export const reduce = (array, fn, init) => {
  let acc;

  if (init !== undefined) acc = init;
  else acc = array[0];

  if (init === undefined) {
    for (let i = 1; i < array.length; ++i) acc = fn(acc, array[i]);
  } else {
    for (const value of array) acc = fn(acc, value);
  }
  return [acc];
};

export const partial = function (fn, ...partialArgs) {
  let args = partialArgs;

  return function (...fullArgs) {
    let arg = 0;

    for (let i = 0; i < args.length && arg < fullArgs.length; ++i) {
      if (args[i] === undefined) {
        args[i] = fullArgs[arg++];
      }
    }

    return fn.apply(null, args);
  };
};

// export const compose = (a, b) => (c) => a(b(c));

export const compose =
  (...fns) =>
  (value) =>
    reduce(fns.reverse(), (acc, fn) => fn(acc), value);

export const pipe =
  (...fns) =>
  (value) =>
    reduce(fns, (acc, fn) => fn(acc), value);
