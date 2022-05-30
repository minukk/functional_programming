import { print, MayBe, arrayUtils, Either } from "../lib/es8-functional";
import request from "sync-request";

const Container = function (val) {
  this.value = val;
};

Container.of = function (value) {
  return new Container(value);
};

// const testValue = new Container(3);
// const testObj = new Container({ a: 1 });
// const testArray = new Container([1, 2, 3]);
const testValue = Container.of(3);
const testObj = Container.of({ a: 1 });
const testArray = Container.of(Container.of([1, 2, 3]));

// print(testValue, testObj, testArray);

Container.prototype.map = function (fn) {
  return Container.of(fn(this.value));
};

let double = (x) => x + x;
const testMap = Container.of(3).map(double);
const testMap2 = Container.of(3).map(double).map(double).map(double);
// print(testMap);
// print(testMap2);

const testString = MayBe.of("string").map((x) => x.toUpperCase());
// print(testString);

// let value = "string";
// if(value !== null || value !== undefined) {
//   return value.toUpperCase();
// }
const testGeorge = MayBe.of("George")
  .map((x) => undefined)
  .map((x) => `Mr. ${x}`);
// print(testGeorge);

const getTopTenSubRedditPosts = (type) => {
  let response;
  try {
    response = JSON.parse(
      request(
        "GET",
        "https://www.reddit.com/r/subreddits/" + type + ".json?limit=10"
      ).getBody("utf8")
    );
  } catch (err) {
    response = {
      message: "Something went wrong",
      errorCode: err["statusCode"],
    };
  }

  return response;
};

// const data = getTopTenSubRedditPosts("new");
// print(data);

const getTopTenSubRedditData = (type) => {
  let response = getTopTenSubRedditPosts(type);

  return MayBe.of(response)
    .map((arr) => arr["data"])
    .map((arr) => arr["children"])
    .map((arr) =>
      arrayUtils.map(arr, (x) => {
        return { title: x["data"].title, url: x["data"].url };
      })
    );
};

// print(getTopTenSubRedditData("new"));

let getTopTenSubRedditPostsEither = (type) => {
  let response;
  try {
    response = Either.Some.of(
      JSON.parse(
        request(
          "GET",
          "https://www.reddit.com/r/subreddits/" + type + ".json?limit=10"
        ).getBody("utf8")
      )
    );
  } catch (err) {
    response = Either.Nothing.of({
      message: "Something went wrong",
      errorCode: err["statusCode"],
    });
  }

  return response;
};

let getTopTenSubRedditDataEither = (type) => {
  let response = getTopTenSubRedditPostsEither(type);

  return response
    .map((arr) => arr["data"])
    .map((arr) => arr["children"])
    .map((arr) =>
      arrayUtils.map(arr, (x) => {
        return { title: x["data"].title, url: x["data"].url };
      })
    );
};

print(getTopTenSubRedditDataEither("new"));
