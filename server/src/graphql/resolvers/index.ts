import merge from "lodash.merge";
import { rentalResolvers } from "./Rental";
import { bookResolvers } from "./Book";
import { userResolvers } from "./User";
import { viewerResolvers } from "./Viewer";

export const resolvers = merge(
  rentalResolvers,
  bookResolvers,
  userResolvers,
  viewerResolvers
);
