export const forEach = (array, fn) => {
  let i;
  for (i = 0; i < array.length; ++i) {
    fn(array[i]);
  }
};

export const forEachObject = (obj, fn) => {
  for (const property in obj) {
    if (obj.hasOwnProperty(property)) {
      fn(property, obj[property]);
    }
  }
};

export const unless = (predicate, fn) => {
  if (!predicate) fn();
};

export const print = (print) => {
  console.log(print);
};

export const times = (times, fn) => {
  for (let i = 0; i < times; ++i) fn(i);
};
