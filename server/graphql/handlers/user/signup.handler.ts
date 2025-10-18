import { db } from "@/lib/db";
import { CreateUserResponse, User } from "@/types";
import { hashedPassword } from "@/utils/bcrypt";
import { GraphQLError } from "graphql";

export async function createUserFn(args: User): Promise<CreateUserResponse> {
  const existingUser = await db.prisma.user.findUnique({
    where: {
      email: args.email
    }
  })
  if (existingUser) {
    throw new GraphQLError("User already exists", {
      extensions: { code: "USER_ALREADY_EXISTS" }
    });
  }
  const hashPassword = await hashedPassword(args.password);
  const User = await db.prisma.user.create({
    data: {
      username: args.username,
      email: args.email,
      password: hashPassword,
      avatarUrl: args.avatarUrl || null
    }
  })
  return {
    user: User,
    message: "User signup success"
  };
}