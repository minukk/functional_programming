const print = (arg) => console.log(arg);

const forEach = (array, fn) => {
  for (const value of array) fn(value);
};

const map = (array, fn) => {
  let result = [];

  for (const value of array) result.push(fn(value));

  return result;
};

const filter = (array, fn) => {
  let result = [];

  for (const value of array) fn(value) ? result.push(value) : undefined;

  return result;
};

const arrayUtils = {
  print: print,
  map: map,
  filter: filter,
};

export default arrayUtils;
