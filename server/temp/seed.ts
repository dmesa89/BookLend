require("dotenv").config();

import { ObjectId } from "mongodb";
import { connectDatabase } from "../src/database";
import { Book, BookType, Condition, User } from "../src/lib/types";

const books: Book[] = [
  {
    _id: new ObjectId("5d378db94e84753160e08b30"),
    title: "The Institute",
    author: "Steven King",
    description:
      "So scary! There is a rip on the front cover, be careful with it please!",
    image:
      "https://res.cloudinary.com/dg9k4lvoi/image/upload/v1605117954/theInstitute_rduz2z.jpg",
    owner: "5d378db94e84753160e08b57",
    type: BookType.Paperback,
    condition: Condition.Good,
    rentals: [],
    rentalsIndex: {},
  },
  {
    _id: new ObjectId("5d378db94e84753160e08b31"),
    title: "Educated",
    author: "Tara Westover",
    description:
      "I finished the book in 3 days, highly recommend. The copy is in great condition too!",
    image:
      "https://res.cloudinary.com/dg9k4lvoi/image/upload/v1605117221/Book_Assets/tgkcmqvu8gwdihskzcmp.jpg",
    owner: "5d378db94e84753160e08b57",
    type: BookType.Paperback,
    condition: Condition.Good,
    rentals: [],
    rentalsIndex: {},
  },
  {
    _id: new ObjectId("5d378db94e84753160e08b32"),
    title: "The Hobbit",
    author: "J.R.R Tolkien",
    description: "Youre going to love Bilbo Baggins",
    image:
      "https://res.cloudinary.com/dg9k4lvoi/image/upload/v1605117954/theHobbit_iidujn.jpg",
    owner: "5d378db94e84753160e08b57",
    type: BookType.Hardcover,
    condition: Condition.Perfect,
    rentals: [],
    rentalsIndex: {},
  },
  {
    _id: new ObjectId("5d378db94e84753160e08b33"),
    title: "The Return",
    author: "Nicholas Sparks",
    description: "So sad, may have water marks from my tears!",
    image:
      "https://res.cloudinary.com/dg9k4lvoi/image/upload/v1605117955/theReturn_ru2aou.jpg",
    owner: "5d378db94e84753160e08b57",
    type: BookType.Paperback,
    condition: Condition.Good,
    rentals: [],
    rentalsIndex: {},
  },
  {
    _id: new ObjectId("5d378db94e84753160e08b34"),
    title: "Lord of The Rings: The Two Towers",
    author: "J.R.R Tolkien",
    description: "The second one is the best one!",
    image:
      "https://res.cloudinary.com/dg9k4lvoi/image/upload/v1605117955/theLordOfTheRings_udn56i.jpg",
    owner: "5d378db94e84753160e08b57",
    type: BookType.Paperback,
    condition: Condition.Good,
    rentals: [],
    rentalsIndex: {},
  },
  {
    _id: new ObjectId("5d378db94e84753160e08b35"),
    title: "Three Women Disappear",
    author: "James Paterson",
    description: "Detective Sean Walsh must solve a case, kept me on my toes!",
    image:
      "https://res.cloudinary.com/dg9k4lvoi/image/upload/v1605117955/threeWomenDissapear_clzeqr.jpg",
    owner: "5d378db94e84753160e08b58",
    type: BookType.Paperback,
    condition: Condition.Good,
    rentals: [],
    rentalsIndex: {},
  },
  {
    _id: new ObjectId("5d378db94e84753160e08b36"),
    title: "Shakeup",
    author: "Stuart Woods",
    description: "A criminal mastermind turns out to be a person of influence.",
    image:
      "https://res.cloudinary.com/dg9k4lvoi/image/upload/v1605117954/Stealth_quei5b.jpg",
    owner: "5d378db94e84753160e08b58",
    type: BookType.Paperback,
    condition: Condition.Average,
    rentals: [],
    rentalsIndex: {},
  },
  {
    _id: new ObjectId("5d378db94e84753160e08b37"),
    title: "Group",
    author: "Christie Tate",
    description:
      "If youre a law student you must read it! Please keep it in great condition",
    image:
      "https://res.cloudinary.com/dg9k4lvoi/image/upload/v1605117954/group_p89h3k.jpg",
    owner: "5d378db94e84753160e08b59",
    type: BookType.Paperback,
    condition: Condition.Good,
    rentals: [],
    rentalsIndex: {},
  },
  {
    _id: new ObjectId("5d378db94e84753160e08b38"),
    title: "Untamed",
    author: "Glennon Doyle",
    description: "She cant be tamed!",
    image:
      "https://res.cloudinary.com/dg9k4lvoi/image/upload/v1605117955/untamed_btxds0.jpg",
    owner: "5d378db94e84753160e08b59",
    type: BookType.Paperback,
    condition: Condition.Perfect,
    rentals: [],
    rentalsIndex: {},
  },
  {
    _id: new ObjectId("5d378db94e84753160e08b39"),
    title: "My Own Words",
    author: "Ruth Bader Ginsburg",
    description: "RBG all the way! Please read this book.",
    image:
      "https://res.cloudinary.com/dg9k4lvoi/image/upload/v1605117955/myOwnWords_sdd2lz.jpg",
    owner: "5d378db94e84753160e08b60",
    type: BookType.Paperback,
    condition: Condition.Good,
    rentals: [],
    rentalsIndex: {},
  },
  {
    _id: new ObjectId("5d378db94e84753160e08b40"),
    title: "Modern Comfort Food",
    author: "Ina Garten",
    description:
      "All the recipes are yummy! Please dont get anymore butter on the sheets.",
    image:
      "https://res.cloudinary.com/dg9k4lvoi/image/upload/v1605117954/cookbook_k1hu8n.jpg",
    owner: "5d378db94e84753160e08b60",
    type: BookType.Paperback,
    condition: Condition.Average,
    rentals: [],
    rentalsIndex: {},
  },
];
const users: User[] = [
  {
    _id: "5d378db94e84753160e08b55",
    token: "token_************",
    name: "James J.",
    avatar:
      "https://res.cloudinary.com/tiny-house/image/upload/w_1000,ar_1:1,c_fill,g_auto/v1560648533/mock/users/user-profile-1_mawp12.jpg",
    email: "james@tinyhouse.com",
    address: "123 apple st",
    city: "Portland",
    state: "Oregon",
    country: "United States",
    rating: 0,
    total: 0,
    points: 1,
    rentals: [],
    books: [
      new ObjectId("5d378db94e84753160e08b31"),
      new ObjectId("5d378db94e84753160e08b32"),
    ],
  },
  {
    _id: "5d378db94e84753160e08b56",
    token: "token_************",
    name: "Elizabeth A.",
    avatar:
      "https://res.cloudinary.com/tiny-house/image/upload/w_1000,ar_1:1,c_fill,g_auto/v1560649052/mock/users/user-profile-2_arwtdy.jpg",
    email: "elizabeth@tinyhouse.com",
    address: "123 orange st",
    city: "Portland",
    state: "Oregon",
    country: "United States",
    rating: 0,
    total: 0,
    points: 1,
    rentals: [],
    books: [new ObjectId("5d378db94e84753160e08b33")],
  },
  {
    _id: "5d378db94e84753160e08b57",
    token: "token_************",
    name: "Andrew D.",
    avatar:
      "https://res.cloudinary.com/tiny-house/image/upload/w_1000,ar_1:1,c_fill,g_auto/v1560649280/mock/users/user-profile-3_omxctk.jpg",
    email: "drew@tinyhouse.com",
    address: "123 pear st",
    city: "Portland",
    state: "Oregon",
    country: "United States",
    rating: 0,
    total: 0,
    points: 1,
    rentals: [],
    books: [new ObjectId("5d378db94e84753160e08b34")],
  },
  {
    _id: "5d378db94e84753160e08b58",
    token: "token_************",
    name: "Stacey J.",
    avatar:
      "https://res.cloudinary.com/tiny-house/image/upload/w_1000,ar_1:1,c_fill,g_auto/v1560648533/mock/users/user-profile-1_mawp12.jpg",
    email: "stacey@tinyhouse.com",
    address: "123 apple st",
    city: "Portland",
    state: "Oregon",
    country: "United States",
    rating: 0,
    total: 0,
    points: 1,
    rentals: [],
    books: [
      new ObjectId("5d378db94e84753160e08b36"),
      new ObjectId("5d378db94e84753160e08b35"),
    ],
  },
  {
    _id: "5d378db94e84753160e08b59",
    token: "token_************",
    name: "Megan L.",
    avatar:
      "https://res.cloudinary.com/tiny-house/image/upload/w_1000,ar_1:1,c_fill,g_auto/v1560648533/mock/users/user-profile-1_mawp12.jpg",
    email: "megan@tinyhouse.com",
    address: "444 apple st",
    city: "Portland",
    state: "Oregon",
    country: "United States",
    rating: 0,
    total: 0,
    points: 1,
    rentals: [],
    books: [
      new ObjectId("5d378db94e84753160e08b38"),
      new ObjectId("5d378db94e84753160e08b37"),
    ],
  },
  {
    _id: "5d378db94e84753160e08b60",
    token: "token_************",
    name: "Josh P.",
    avatar:
      "https://res.cloudinary.com/tiny-house/image/upload/w_1000,ar_1:1,c_fill,g_auto/v1560648533/mock/users/user-profile-1_mawp12.jpg",
    email: "josh@tinyhouse.com",
    address: "444 apple st",
    city: "Miami",
    state: "Florida",
    country: "United States",
    rating: 0,
    total: 0,
    points: 1,
    rentals: [],
    books: [
      new ObjectId("5d378db94e84753160e08b39"),
      new ObjectId("5d378db94e84753160e08b40"),
    ],
  },
];

const seed = async () => {
  try {
    console.log("[seed]: running...");
    const db = await connectDatabase();

    for (const book of books) {
      await db.books.insertOne(book);
    }

    for (const user of users) {
      await db.users.insertOne(user);
    }

    console.log("[seed]: succcess...");
  } catch {
    throw new Error("Failed to see database.");
  }
};

seed();
