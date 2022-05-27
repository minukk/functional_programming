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

// export const every = (arr, fn) => {
//   let result = true;

//   for (let i = 0; i < arr.length; ++i) {
//     result = result && fn(arr[i]);
//   }
//   return result;
// };

export const every = (arr, fn) => {
  let result = true;

  for (const value of arr) result = result && fn(value);

  return result;
};

export const some = (arr, fn) => {
  let result = false;

  for (const value of arr) result = result || fn(value);

  return result;
};

export const sortBy = (prop) => {
  return (a, b) => {
    const result = a[prop] < b[prop] ? -1 : a[prop] > b[prop] ? -1 : 0;
    return result;
  };
};
