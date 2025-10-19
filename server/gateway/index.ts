import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { configDotenv } from "dotenv";

configDotenv();

async function start() {
  const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        { name: "user", url: "http://localhost:3401" },
        // { name: "user", url: `${process.env.HOST}:${process.env.USER_PORT}` },
        // { name: "avatar", url: `${process.env.HOST}${process.env.AVATAR_PORT}` },
      ]
    })
  })

  const server = new ApolloServer({
    gateway
  })

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4001 }
  })
  console.log(`🚀 Gateway ready at ${url}`);

}

start();