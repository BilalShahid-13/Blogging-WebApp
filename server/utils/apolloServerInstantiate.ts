import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { GraphQLResolverMap } from "@apollo/subgraph/dist/schema-helper";
import { DocumentNode } from "graphql";

export async function graphqlInstantiate(typeDefs: DocumentNode | DocumentNode[], resolvers: GraphQLResolverMap<unknown> | undefined,
  PORT: number, serviceName: string
) {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({
      typeDefs,
      resolvers,
    })
  })

  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
  });

  console.log(`👤 ${serviceName} service ready at ${url}`);
}
