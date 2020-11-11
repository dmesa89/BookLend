import { Request } from "express";
import { IResolvers } from "apollo-server-express";
import { Database, User } from "../../../lib/types";
import { Google } from "../../../lib/api";
import { authorize } from "../../../lib/utils";
import { ObjectId } from "mongodb";
import {
  UserArgs,
  UserRentalsArgs,
  UserRentalsData,
  UserBooksArgs,
  UserBooksData,
  UpdateProfileArgs,
  UpdateProfileInput,
} from "./types";

export const userResolvers: IResolvers = {
  Query: {
    user: async (
      _root: undefined,
      { id }: UserArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<User> => {
      try {
        const user = await db.users.findOne({ _id: id });

        if (!user) {
          throw new Error("user can't be found");
        }
        const viewer = await authorize(db, req);

        if (viewer && viewer._id === user._id) {
          user.authorized = true;
        }
        return user;
      } catch (error) {
        throw new Error(`Failed to query user: ${error}`);
      }
    },
  },
  Mutation: {
    updateProfile: async (
      _root: undefined,
      { input }: UpdateProfileArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<User | null> => {
      let viewer = await authorize(db, req);

      if (!viewer) {
        throw new Error("viewer cannot be found");
      }

      const { country, city, state } = await Google.geocode(input.address);
      if (!country || !state || !city) {
        throw new Error("invalid address input");
      }

      const updateUser = await db.users.findOneAndUpdate(
        { _id: viewer._id },
        {
          $set: {
            city,
            address: input.address,
            state,
            country,
          },
        },
        { returnOriginal: false }
      );

      console.log(updateUser);
      return null;
    },
  },
  User: {
    id: (user: User): string => {
      return user._id;
    },
    points: (user: User): number | null => {
      return user.authorized ? user.points : null;
    },
    rentals: async (
      user: User,
      { limit, page }: UserRentalsArgs,
      { db }: { db: Database }
    ): Promise<UserRentalsData | null> => {
      try {
        if (!user.authorized) {
          return null;
        }

        const data: UserRentalsData = {
          total: 0,
          result: [],
        };

        let cursor = await db.rentals.find({
          _id: { $in: user.rentals },
        });

        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
        cursor = cursor.limit(limit);

        data.total = await cursor.count();
        data.result = await cursor.toArray();

        return data;
      } catch (error) {
        throw new Error(`Failed to query user rentals: ${error}`);
      }
    },
    books: async (
      user: User,
      { limit, page }: UserBooksArgs,
      { db }: { db: Database }
    ): Promise<UserBooksData | null> => {
      try {
        const data: UserBooksData = {
          total: 0,
          result: [],
        };

        let cursor = await db.books.find({
          _id: { $in: user.books },
        });

        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
        cursor = cursor.limit(limit);

        data.total = await cursor.count();
        data.result = await cursor.toArray();

        return data;
      } catch (error) {
        throw new Error(`Failed to query user books: ${error}`);
      }
    },
  },
};
