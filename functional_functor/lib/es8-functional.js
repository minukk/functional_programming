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

const Nothing = function (val) {
  this.value = val;
};

Nothing.of = function (val) {
  return new Nothing(val);
};
Nothing.prototype.map = function (fn) {
  return this;
};

const Some = function (val) {
  this.value = val;
};

Some.of = function (val) {
  return new Some(val);
};

Some.prototype.map = function (fn) {
  return Some.of(fn(this.value));
};

export const Either = {
  Some,
  Nothing,
};

const map = (array, fn) => {
  let results = [];

  for (const value of array) results.push(fn(value));

  return results;
};

export const arrayUtils = {
  map: map,
};
