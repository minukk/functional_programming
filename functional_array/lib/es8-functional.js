const print = (arg) => console.log(arg);

const forEach = (array, fn) => {
  for (const value of array) fn(value);
};

const map = (array, fn) => {
  let result = [];

  for (const value of array) result.push(fn(value));

  // for (let i = 0; i < array.length; ++i) {
  //   result.push(fn(array[i]));
  // }

  return result;
};

const filter = (array, fn) => {
  let result = [];

  for (const value of array) fn(value) ? result.push(value) : undefined;

  return result;
};

const concatAll = (array, fn) => {
  let results = [];

  for (const value of array) {
    results.push.apply(results, value);
    console.log(results);
  }
  // for (let i = 0; i < array.length; ++i) {
  //   results.push.apply(results, array[i]);
  // }

  return results;
};

// const reduce = (array, fn) => {
//   let acc = 0;

//   for (const value of array) acc = fn(acc, value);

//   return [acc];
// };

const reduce = (array, fn, init) => {
  let acc;

  if (init !== undefined) acc = init;
  else acc = array[0];

  if (init === undefined) {
    for (let i = 1; i < array.length; ++i) {
      acc = fn(acc, array[i]);
    }
  } else {
    for (const value of array) {
      acc = fn(acc, value);
    }
  }

  return [acc];
};

const zip = (leftArr, rightArr, fn) => {
  let results = [];

  for (let i = 0; i < Math.min(leftArr.length, rightArr.length); ++i)
    results.push(fn(leftArr[i], rightArr[i]));

  return results;
};

const arrayUtils = {
  print: print,
  map: map,
  filter: filter,
  concatAll: concatAll,
  reduce: reduce,
  zip: zip,
};

export default arrayUtils;
