import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Rental {
    id: ID!
    book: Book!
    reader: User!
    checkIn: String!
    checkOut: String!
  }

  type Rentals {
    total: Int!
    result: [Rental!]!
  }

  enum BookType {
    HARDCOVER
    PAPERBACK
  }

  enum Condition {
    PERFECT
    GOOD
    AVERAGE
  }

  enum BooksFilter {
    ALPHABETICALLY_TITLE
    ALPHABETICALLY_AUTHOR
    RANDOM
  }

  type Book {
    id: ID!
    title: String!
    description: String!
    author: String!
    image: String!
    owner: String!
    type: BookType!
    condition: Condition!
    rentals(limit: Int!, page: Int!): Rentals
    rentalsIndex: String!
  }

  type Books {
    region: String
    total: Int!
    result: [Book!]!
  }

  type User {
    id: ID!
    name: String!
    avatar: String!
    address: String!
    city: String!
    country: String!
    state: String!
    rating: Int!
    total: Int!
    points: Int
    email: String!
    rentals(limit: Int!, page: Int!): Rentals
    books(limit: Int!, page: Int!): Books!
  }

  type Viewer {
    id: ID
    token: String
    avatar: String
    didRequest: Boolean!
  }

  input BookRentalInput {
    title: String!
    description: String!
    author: String!
    image: String!
    type: BookType!
    condition: Condition!
  }

  input UpdateProfileInput {
    address: String
    city: String
    country: String
    state: String
  }

  input CreateRentalInput {
    id: ID!
    checkIn: String!
    checkOut: String!
  }

  input LogInInput {
    code: String!
  }

  type Query {
    authUrl: String!
    user(id: ID!): User!
    book(id: ID!): Book!
    books(
      location: String
      filter: BooksFilter!
      limit: Int!
      page: Int!
    ): Books!
  }

  type Mutation {
    logIn(input: LogInInput): Viewer!
    logOut: Viewer!
    bookRental(input: BookRentalInput!): Book!
    updateProfile(input: UpdateProfileInput!): User
    createRental(input: CreateRentalInput!): Rental!
  }
`;
