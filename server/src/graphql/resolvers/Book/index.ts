import { IResolvers } from "apollo-server-express";
import { Request } from "express";
import { Database, Book, User, BookType, Condition } from "../../../lib/types";
import { Cloudinary, Google } from "../../../lib/api";
import { authorize } from "../../../lib/utils";
import {
  BookArgs,
  BookRentalsArgs,
  BookRentalsData,
  BooksArgs,
  BooksData,
  BooksFilter,
  BooksQuery,
  BookRentalArgs,
  BookRentalInput,
} from "./types";
import { ObjectId } from "mongodb";

const verifyBookInput = ({
  title,
  description,
  author,
  condition,
  type,
}: BookRentalInput) => {
  if (title.length > 50) {
    throw new Error("book title must be under 50 characters");
  }
  if (description.length > 500) {
    throw new Error("book description must be under 500 characters");
  }
  if (author.length > 50) {
    throw new Error("author must be under 50 characters");
  }
  if (type !== BookType.Paperback && type !== BookType.Hardcover) {
    throw new Error("Please list book as paperback or hardcover.");
  }
  if (
    condition != Condition.Average &&
    condition != Condition.Perfect &&
    condition != Condition.Good
  ) {
    throw new Error("Please list the condition of the book.");
  }
};

export const bookResolvers: IResolvers = {
  Query: {
    book: async (
      _root: undefined,
      { id }: BookArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<Book> => {
      try {
        const book = await db.books.findOne({ _id: new ObjectId(id) });
        if (!book) {
          throw new Error("book can't be found");
        }

        const viewer = await authorize(db, req);
        if (viewer && viewer._id === book.owner) {
          book.authorized = true;
        }

        return book;
      } catch (error) {
        throw new Error(`Failed to query book: ${error}`);
      }
    },
    books: async (
      _root: undefined,
      { location, filter, limit, page }: BooksArgs,
      { db }: { db: Database }
    ): Promise<BooksData> => {
      try {
        const data: BooksData = {
          region: null,
          total: 0,
          result: [],
        };

        let cursor;
        let books_ids: ObjectId[] = [];

        if (location) {
          const query: BooksQuery = {};
          const { country, state, city } = await Google.geocode(location);

          if (city) query.city = city;
          if (state) query.state = state;
          if (country) {
            query.country = country;
          } else {
            throw new Error("no country found");
          }

          const cityText = city ? `${city}, ` : "";
          const stateText = state ? `${state}, ` : "";

          data.region = `${cityText}${stateText}${country}`;

          cursor = await db.users.find(query);
          let users = await cursor.toArray();
          users.forEach((user) => {
            user.books.forEach((book_id) => {
              books_ids.push(new ObjectId(book_id));
            });
          });
        }

        if (filter && filter !== BooksFilter.RANDOM) {
          if (location) {
            cursor = await db.books.find({ _id: { $in: books_ids } });
          } else {
            cursor = await db.books.find({});
          }

          if (filter && filter === BooksFilter.ALPHABETICALLY_TITLE) {
            cursor = cursor.sort({ title: 1 });
          }

          if (filter && filter === BooksFilter.ALPHABETICALLY_AUTHOR) {
            cursor = cursor.sort({ author: 1 });
          }

          cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
          cursor = cursor.limit(limit);

          data.total = await cursor.count();
          data.result = await cursor.toArray();
        } else {
          cursor = await db.books.find({});
          let total = await cursor.count();
          let result = await cursor.toArray();

          async function randomize() {
            let usedNums: number[] = [];
            let newResult: Book[] = [];
            var i = 0;

            while (i < limit) {
              var randomNum = Math.floor(Math.random() * total);
              if (usedNums.includes(randomNum)) {
                randomNum = Math.floor(Math.random() * total);
              }
              usedNums.push(randomNum);
              newResult.push(result[randomNum]);
              i++;
            }
            return newResult;
          }
          data.total = limit;
          data.result = await randomize();
        }

        return data;
      } catch (error) {
        throw new Error(`Failed to query books: ${error}`);
      }
    },
  },
  Mutation: {
    bookRental: async (
      _root: undefined,
      { input }: BookRentalArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<Book> => {
      verifyBookInput(input);
      let viewer = await authorize(db, req);

      if (!viewer) {
        throw new Error("viewer cannot be found");
      }

      const imageUrl = await Cloudinary.upload(input.image);

      const insertResult = await db.books.insertOne({
        _id: new ObjectId(),
        ...input,
        image: imageUrl,
        owner: viewer._id,
        rentals: [],
        rentalsIndex: {},
      });

      const insertedBook: Book = insertResult.ops[0];

      await db.users.updateOne(
        { _id: viewer._id },
        { $push: { books: insertedBook._id } }
      );

      return insertedBook;
    },
  },
  Book: {
    id: (book: Book): string => {
      return book._id.toString();
    },
    owner: (book: Book): string => {
      return book.owner;
    },
    rentalsIndex: (book: Book): string => {
      return JSON.stringify(book.rentalsIndex);
    },
    rentals: async (
      book: Book,
      { limit, page }: BookRentalsArgs,
      { db }: { db: Database }
    ): Promise<BookRentalsData | null> => {
      try {
        if (!book.authorized) {
          return null;
        }

        const data: BookRentalsData = {
          total: 0,
          result: [],
        };

        let cursor = await db.rentals.find({
          _id: { $in: book.rentals },
        });

        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
        cursor = cursor.limit(limit);

        data.total = await cursor.count();
        data.result = await cursor.toArray();

        return data;
      } catch (error) {
        throw new Error(`Failed to query book rentals: ${error}`);
      }
    },
  },
};
