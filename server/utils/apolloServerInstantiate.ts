import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { GraphQLResolverMap } from "@apollo/subgraph/dist/schema-helper";
import { DocumentNode } from "graphql";
import { IResolvers } from "@graphql-tools/utils";

type AnyResolvers = IResolvers<any, any> | GraphQLResolverMap<any>;

export async function graphqlInstantiate(
  typeDefs: DocumentNode | DocumentNode[],
  resolvers: AnyResolvers,
  PORT: number,
  serviceName: string
) {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({
      typeDefs,
      resolvers: resolvers as unknown as GraphQLResolverMap<any>,
    }),
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
  });

  console.log(`👤 ${serviceName} service ready at ${url}`);
}
