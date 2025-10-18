import { mergeResolvers } from "@graphql-tools/merge";
import { userResolvers } from "./resolvers/user.resolver";

export const resolvers = mergeResolvers([userResolvers]);
