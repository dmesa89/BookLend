import { Database, User } from "../../lib/types";
import { Request } from "express";

export const authorize = async (
  db: Database,
  req: Request
): Promise<User | null> => {
  const token = req.get("X-CSRF-TOKEN");
  const viewer = db.users.findOne({
    _id: req.signedCookies.viewer,
    token,
  });

  return viewer;
};
