import { ApolloServer } from "@apollo/server";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { typeDefs } from "./graphql/schema";
import { expressMiddleware } from "@as-integrations/express5";
import { resolvers } from "./graphql/resolvers";

const app = express();
const port = 4000;

async function startServer() {
  try {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    await server.start();

    app.use(
      "/graphql",
      cors(),
      bodyParser.json(),
      expressMiddleware(server)
    );

    app.listen(port, () => {
      console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
  }
}

startServer();