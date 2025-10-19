import { mergeResolvers } from "@graphql-tools/merge";
import { userResolvers } from "./resolvers/user.resolver";
import { avatarResolvers } from "./resolvers/avatar.resolver";

export const resolvers = mergeResolvers([userResolvers, avatarResolvers]);
