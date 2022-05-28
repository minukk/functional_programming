export const print = (arg) => console.log(arg);

// export const curry = (fn) => {
//   if (typeof fn !== "function") throw Error("No Function Provided");
//   return (...args) => fn.apply(null, args);
// };

export const curry = (fn) => {
  if (typeof fn !== "function") throw Error("No Function Provided");
  return function curriedFn(...args) {
    if (args.length < fn.length) {
      return function () {
        return curriedFn.apply(null, args.concat([].slice.call(arguments)));
      };
    }
    return fn.apply(null, args);
  };
};

export const setTimeoutWrapper = (time, fn) => setTimeout(fn, time);

export const partial = function (fn, ...partialArgs) {
  let args = partialArgs;

  return function (...fullArguments) {
    let arg = 0;

    for (let i = 0; i < args.length && arg < fullArguments.length; ++i) {
      if (args[i] === undefined) args[i] = fullArguments[arg++];
    }

    return fn.apply(null, args);
  };
};
