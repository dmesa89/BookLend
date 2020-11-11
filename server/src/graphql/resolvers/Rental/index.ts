import { IResolvers } from "apollo-server-express";
import { Request } from "express";
import { Database, Book, Rental } from "../../../lib/types";
import { CreateRentalArgs } from "./types";

export const rentalResolvers: IResolvers = {
  Mutation: {
    createRental: (
      _root: undefined,
      { input }: CreateRentalArgs,
      { db }: { db: Database }
    ): Promise<Rental> | void => {
      try {
        const { id, checkIn, checkOut } = input;
      } catch {}
    },
  },
  Rental: {
    id: (rental: Rental): string => {
      return rental._id.toString();
    },
    book: (
      rental: Rental,
      _args: {},
      { db }: { db: Database }
    ): Promise<Book | null> => {
      return db.books.findOne({ _id: rental.book });
    },
  },
};
