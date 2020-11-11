import { Rental, Book } from "../../../lib/types";
import { BookType, Condition } from "../../../lib/types";

export enum BooksFilter {
  ALPHABETICALLY_TITLE = "ALPHABETICALLY_TITLE",
  ALPHABETICALLY_AUTHOR = "ALPHABETICALLY_AUTHOR",
  RANDOM = "RANDOM",
}

export interface BookArgs {
  id: string;
}

export interface BookRentalsArgs {
  limit: number;
  page: number;
}

export interface BookRentalsData {
  total: number;
  result: Rental[];
}

export interface BooksArgs {
  location: string | null;
  filter: BooksFilter;
  limit: number;
  page: number;
}

export interface BooksData {
  region: string | null;
  total: number;
  result: Book[];
}

export interface BooksQuery {
  country?: string;
  state?: string;
  city?: string;
}

export interface BookRentalInput {
  title: string;
  description: string;
  author: string;
  image: string;
  type: BookType;
  condition: Condition;
}

export interface BookRentalArgs {
  input: BookRentalInput;
}
