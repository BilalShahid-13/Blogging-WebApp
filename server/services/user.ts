import { userResolvers as resolvers } from "@/graphql/resolvers/user.resolver";
import { graphqlInstantiate } from "@/utils/apolloServerInstantiate";
import { readFile } from "@/utils/graphqlReadFile";
import { config } from "dotenv";
import gql from "graphql-tag";

config();

const typeDefs = gql(readFile("user.graphql"));
const port = Number(process.env.USER_PORT!);  // 3401
(async () => {
  await graphqlInstantiate(typeDefs,
    resolvers, port, "user")
})()