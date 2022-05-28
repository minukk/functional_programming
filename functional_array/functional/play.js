import arrayUtils from "../lib/es8-functional";

const { concatAll, print, map, filter, reduce, zip } = arrayUtils;

// print(map([1, 2, 3], (x) => x * x));

const apressBooks = [
  {
    id: 111,
    title: "C# 6.0",
    author: "ANDREW TROELSEN",
    rating: [4.7],
    reviews: [{ good: 4, excellent: 12 }],
  },
  {
    id: 222,
    title: "Efficient Learning Machines",
    author: "Rahul Khanna",
    rating: [4.5],
    reviews: [],
  },
  {
    id: 333,
    title: "Pro AugularJS",
    author: "Adam Freeman",
    rating: [4.0],
    reviews: [],
  },
  {
    id: 444,
    title: "Pro ASP.NET",
    author: "Adam Freeman",
    rating: [4.2],
    reviews: [{ good: 14, excellent: 12 }],
  },
];

const apressBooks2 = [
  {
    name: "beginners",
    bookDetails: [
      {
        id: 111,
        title: "C# 6.0",
        author: "ANDREW TROELSEN",
        rating: [4.7],
        reviews: [{ good: 4, excellent: 12 }],
      },
      {
        id: 222,
        title: "Efficient Learning Machines",
        author: "Rahul Khanna",
        rating: [4.5],
        reviews: [],
      },
    ],
  },
  {
    name: "pro",
    bookDetails: [
      {
        id: 333,
        title: "Pro AugularJS",
        author: "Adam Freeman",
        rating: [4.0],
        reviews: [],
      },
      {
        id: 444,
        title: "Pro ASP.NET",
        author: "Adam Freeman",
        rating: [4.2],
        reviews: [{ good: 14, excellent: 12 }],
      },
    ],
  },
];

const reviewDetails = [
  {
    id: 111,
    reviews: [{ good: 4, excellent: 12 }],
  },
  {
    id: 222,
    reviews: [],
  },
  {
    id: 333,
    reviews: [],
  },
  {
    id: 444,
    reviews: [{ good: 14, excellent: 12 }],
  },
];

// print(
//   map(apressBooks, (book) => ({
//     title: book.title,
//     author: book.author,
//   }))
// );

// print(filter(apressBooks, (book) => book.rating[0] > 4.5));

let useless = [2, 5, 6, 1, 10];

let result = 0;
useless.forEach((value) => {
  result = result + value;
});
print(result);
print(reduce(useless, (acc, val) => acc + val));

let bookDetails = concatAll(map(apressBooks2, (book) => book.bookDetails));

const reduceBookDetails = reduce(
  bookDetails,
  (acc, bookDetail) => {
    let goodReviews =
      bookDetail.reviews[0] !== undefined ? bookDetail.reviews[0].good : 0;
    let excellentReviews =
      bookDetail.reviews[0] !== undefined ? bookDetail.reviews[0].excellent : 0;

    return {
      good: acc.good + goodReviews,
      excellent: acc.excellent + excellentReviews,
    };
  },
  { good: 0, excellent: 0 }
);

print(reduceBookDetails);

print(zip([1, 2, 3], [4, 5, 6], (a, b) => a + b));

let mergedBookDetails = zip(bookDetails, reviewDetails, (book, review) => {
  if (book.id === review.id) {
    let clone = Object.assign({}, book);
    clone.ratings = review;

    return clone;
  }
});

print(mergedBookDetails);
