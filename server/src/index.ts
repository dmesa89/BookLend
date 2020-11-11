require("dotenv").config();

import bodyParser from "body-parser";
//though node supports a vast majority of es6 features it does
//not natively support import features but with typescript we can use it.
import express, { Application } from "express";

//import the apollo server class
import { ApolloServer } from "apollo-server-express";

import cookieParser from "cookie-parser";

import { connectDatabase } from "./database";

import { typeDefs, resolvers } from "./graphql";

//create an express server instance by running express function
const app = express();

const mount = async (app: Application) => {
  const db = await connectDatabase();

  app.use(bodyParser.json({ limit: "2mb" }));
  app.use(cookieParser(process.env.SECRET));

  //create an apollo server instance with constructor
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ db, req, res }),
  });

  //specify middleware to work along side server middleware. We will pass in express
  //app instance and specify endpoint for where the graphql should live.
  server.applyMiddleware({ app, path: "/api" });

  //listen is a function from express that allows us to create the
  //node server at a specefied port
  app.listen(process.env.PORT);

  console.log(`[app]: http://localhost:${process.env.PORT}`);
};

mount(express());
