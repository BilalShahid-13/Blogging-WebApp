import { db } from "@/lib/db";
import { User } from "@/types";
import { ZodValidator } from "@/utils/zodError";
import { loginSchema, userSchema } from "@/zodSchema/user.zod.schema";
import { errorHandler, loginHandler } from "../handlers/user/login.handler";
import { createUserFn } from "../handlers/user/signup.handler";


export const userResolvers = {
  Mutation: {
    createUser: async (parent: any, args: User) => {
      const zodValidator = new ZodValidator(userSchema);
      zodValidator.validate({
        username: args.username,
        email: args.email,
        password: args.password,
        avatarUrl: args.avatarUrl || null
      });
      return await db.prismaConfigure(
        async () => await createUserFn(args),
        // (error) => errorHandler(error),
      );

    }
  },
  Query: {
    login: async (parent: any, args: User) => {
      const zodValidator = new ZodValidator(loginSchema);
      zodValidator.validate({
        email: args.email,
        password: args.password
      });
      return await db.prismaConfigure(
        async () => await loginHandler(args),
        // (error) => errorHandler(error),
      );
    }
  }
}
