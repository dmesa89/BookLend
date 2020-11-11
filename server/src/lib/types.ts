// Type definitions to be used in our code
import { Collection, ObjectId } from "mongodb";

export interface User {
  _id: string;
  token: string;
  name: string;
  avatar: string;
  address: string;
  country: string;
  city: string;
  state: string;
  email: string;
  rating: number;
  total: number;
  points: number | null;
  rentals: ObjectId[];
  books: ObjectId[];
  authorized?: boolean;
}

export interface Viewer {
  _id?: string;
  token?: string;
  avatar?: string;
  didRequest: boolean;
}

export enum BookType {
  Hardcover = "HARDCOVER",
  Paperback = "PAPERBACK",
}

export enum Condition {
  Perfect = "PERFECT",
  Good = "GOOD",
  Average = "AVERAGE",
}

export interface RentalsIndexMonth {
  [key: string]: boolean;
}
export interface RentalsIndexYear {
  [key: string]: RentalsIndexMonth;
}
export interface RentalsIndex {
  [key: string]: RentalsIndexYear;
}

export interface Rental {
  _id: ObjectId;
  book: ObjectId;
  reader: string;
  checkIn: string;
  checkOut: string;
}

export interface Book {
  _id: ObjectId;
  title: string;
  author: string;
  description: string;
  image: string;
  owner: string;
  type: BookType;
  condition: Condition;
  rentals: ObjectId[];
  rentalsIndex: RentalsIndex;
  authorized?: boolean;
}

export interface Database {
  rentals: Collection<Rental>;
  books: Collection<Book>;
  users: Collection<User>;
}
