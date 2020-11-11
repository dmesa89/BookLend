require("dotenv").config();

import { connectDatabase } from "../src/database";

const clear = async () => {
  try {
    console.log("[clear]: running...");
    const db = await connectDatabase();

    const rentals = await db.rentals.find({}).toArray();
    const books = await db.books.find({}).toArray();
    const users = await db.users.find({}).toArray();

    if (rentals.length > 0) {
      await db.rentals.drop();
    }

    if (books.length > 0) {
      await db.books.drop();
    }

    if (users.length > 0) {
      await db.users.drop();
    }

    console.log("[clear]: succcess...");
  } catch {
    throw new Error("Failed to see database.");
  }
};

clear();
