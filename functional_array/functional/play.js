import arrayUtils from "../lib/es8-functional";

arrayUtils.print(arrayUtils.map([1, 2, 3], (x) => x * x));

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

arrayUtils.print(
  arrayUtils.map(apressBooks, (book) => ({
    title: book.title,
    author: book.author,
  }))
);

arrayUtils.print(
  arrayUtils.filter(apressBooks, (book) => book.rating[0] > 4.5)
);
