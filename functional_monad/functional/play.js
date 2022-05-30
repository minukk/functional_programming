import { print, MayBe, arrayUtils } from "../lib/es8-functional";
import request from "sync-request";

// let searchReddit = (search) => {
//   let response;
//   try {
//     response = JSON.parse(
//       request(
//         "GET",
//         "https://www.reddit.com/search.json?q=" + encodeURI(search) + "&limit=2"
//       ).getBody("utf8")
//     );
//   } catch (err) {
//     response = {
//       message: "Something went wrong",
//       errorCode: err["statusCode"],
//     };
//   }
//   return response;
// };

// let getComments = (link) => {
//   let response;
//   try {
//     console.log(link);
//     response = JSON.parse(
//       request("GET", "https://www.reddit.com/" + link).getBody("utf8")
//     );
//   } catch (err) {
//     console.log(err);
//     response = {
//       message: "Something went wrong",
//       errorCode: err["statusCode"],
//     };
//   }

//   return response;
// };

const searchReddit = (search) => {
  let response;
  try {
    response = JSON.parse(
      request(
        "GET",
        `https://www.reddit.com/search.json?q=${encodeURI(search)}&limit=5`
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

print(searchReddit("Functional Programming"));

const getComments = (link) => {
  let response;
  try {
    response = JSON.parse(
      request("GET", `https://www.reddit.com/${link}`).getBody("utf8")
    );
  } catch (err) {
    response = {
      message: "Something went wrong",
      errorCode: err["statusCode"],
    };
  }
  return response;
};

let margeViaMayBe = (searchText) => {
  let redditMayBe = MayBe.of(searchReddit(searchText));
  let ans = redditMayBe
    .map((arr) => arr["data"])
    .map((arr) => arr["children"])
    .map((arr) =>
      arrayUtils.map(arr, (x) => {
        return { title: x["data"].title, permalink: x["data"].permalink };
      })
    )
    .map((obj) =>
      arrayUtils.map(obj, (x) => {
        return {
          title: x.title,
          comments: MayBe.of(
            getComments(x.permalink.replace("?ref=search_posts", ".json"))
          ),
        };
      })
    );

  return ans;
};

// print(margeViaMayBe("functional programming"));

let joinExample = MayBe.of(MayBe.of(5));
print(joinExample);
print(joinExample.join());
let joinExample2 = joinExample.map((outsideMayBe) =>
  outsideMayBe.map((value) => value + 4)
);
print(joinExample2);
let joinExample3 = joinExample.join().map((v) => v + 4);
print(joinExample3);

// let mergeViaJoin = (searchText) => {
//   let redditMayBe = MayBe.of(searchReddit(searchText));

//   let ans = redditMayBe
//     .map((arr) => arr["data"])
//     .map((arr) => arr["children"])
//     .map((arr) =>
//       arrayUtils.map(arr, (x) => {
//         return {
//           title: x["data"].title,
//           permalink: x["data"].permalink,
//         };
//       })
//     )
//     .map((obj) =>
//       arrayUtils.map(obj, (x) => {
//         return {
//           title: x.title,
//           comments: MayBe.of(
//             getComments(x.permalink.replace("?ref=search_posts", ".json"))
//           ).join(),
//         };
//       })
//     )
//   .join();
//   return ans;
// };

let mergeViaJoin = (searchText) => {
  let redditMayBe = MayBe.of(searchReddit(searchText));
  let ans = redditMayBe
    .map((arr) => arr["data"])
    .map((arr) => arr["children"])
    .map((arr) =>
      arrayUtils.map(arr, (x) => {
        return {
          title: x["data"].title,
          permalink: x["data"].permalink,
        };
      })
    )
    .map((obj) =>
      arrayUtils.map(obj, (x) => {
        return {
          title: x.title,
          comments: MayBe.of(
            getComments(x.permalink.replace("?ref=search_posts", ".json"))
          ).join(),
        };
      })
    )
    .join();

  return ans;
};

// print(mergeViaJoin("functional programming"));

let mergeChain = (searchText) => {
  let redditMayBe = MayBe.of(searchReddit(searchText));

  let ans = redditMayBe
    .map((arr) => arr["data"])
    .map((arr) => arr["children"])
    .map((arr) =>
      arrayUtils.map(arr, (x) => {
        return {
          title: x["data"].title,
          permalink: x["data"].permalink,
        };
      })
    )
    .chain((obj) =>
      arrayUtils.map(obj, (x) => {
        return {
          title: x.title,
          comments: MayBe.of(
            getComments(x.permalink.replace("?ref=search_posts", ".json"))
          ).chain((x) => {
            return x.length;
          }),
        };
      })
    );

  return ans;
};

print(mergeChain("funcional programming"));
