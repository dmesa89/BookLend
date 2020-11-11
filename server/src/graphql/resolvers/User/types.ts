import { Rental, Book } from "./../../../lib/types";

export interface UserArgs {
  id: string;
}

export interface UserRentalsArgs {
  limit: number;
  page: number;
}

export interface UserRentalsData {
  total: number;
  result: Rental[];
}

export interface UserBooksArgs {
  limit: number;
  page: number;
}

export interface UserBooksData {
  total: number;
  result: Book[];
}
export interface UpdateProfileInput {
  address: string;
  city: string;
  country: string;
  state: string;
}
export interface UpdateProfileArgs {
  input: UpdateProfileInput;
}
