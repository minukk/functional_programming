export const print = (...args) => {
  for (const arg of args) console.log(arg);
};

export const MayBe = function (val) {
  this.value = val;
};

MayBe.of = function (val) {
  return new MayBe(val);
};

MayBe.prototype.isNothing = function () {
  return this.value === null || this.value === undefined;
};

MayBe.prototype.map = function (fn) {
  return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this.value));
};

MayBe.prototype.join = function () {
  return this.isNothing() ? MayBe.of(null) : this.value;
};

MayBe.prototype.chain = function (f) {
  return this.map(f).join();
};

const map = (array, fn) => {
  let results = [];

  for (const value of array) results.push(fn(value));

  return results;
};

export const arrayUtils = {
  map: map,
};
