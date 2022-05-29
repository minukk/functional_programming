import { print, map, filter, compose, partial, pipe } from "../lib/utils";

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

print(
  map(
    filter(apressBooks, (book) => book.rating[0] > 4.5),
    (book) => ({ title: book.title, author: book.author })
  )
);

let data = parseFloat("3.56");
let number = Math.round(data);
print(number);

let composeNumber = compose(Math.round, parseFloat);

print(composeNumber("3.56"));

let splitIntoSpaces = (str) => str.split(" ");
let count = (array) => array.length;

let countWords = compose(count, splitIntoSpaces);
print(countWords("hello your reading about composition !!!"));

let filterOutStandingBooks = (book) => book.rating[0] === 5;
let filterGoodBooks = (book) => book.rating[0] > 4.5;
let filterBadBooks = (book) => book.rating[0] < 3.5;

let projectTitleAndAuthor = (book) => ({
  title: book.title,
  author: book.author,
});
let projectAuthor = (book) => ({ author: book.author });
let projectTitle = (book) => ({ title: book.title });

let queryGoodBooks = partial(filter, undefined, filterGoodBooks);
let mapTitleAndAuthor = partial(map, undefined, projectTitleAndAuthor);

let titleAndAuthorForGoodBooks = compose(mapTitleAndAuthor, queryGoodBooks);
print(titleAndAuthorForGoodBooks(apressBooks));

let mapTitle = partial(map, undefined, projectTitle);
let titleForGoodBooks = compose(mapTitle, queryGoodBooks);
print(titleForGoodBooks(apressBooks));

let oddOrEven = (ip) => (ip % 2 === 0 ? "even" : "odd");
const oddOrEvenWords = compose(oddOrEven, count, splitIntoSpaces);
print(oddOrEvenWords("hello your reading about composition"));

const oddOrEvenWordsPipe = pipe(splitIntoSpaces, count, oddOrEven);
print(oddOrEvenWordsPipe("hello your reading about composition"));

// compose(f, compose(g, h) == compose(f, g), h);

const identity = (it) => {
  print(it);
  return it;
};

const test = compose(
  oddOrEven,
  count,
  identity,
  splitIntoSpaces
)("Test string");
print(test);
