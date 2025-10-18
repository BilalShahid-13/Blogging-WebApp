import { db } from "@/lib/db";
import { generateToken } from "@/lib/token";
import { CreateUserResponse, User } from "@/types";
import { hashedPassword } from "@/utils/bcrypt";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
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
      avatar: args.avatarUrl ? {
        create: {
          url: args.avatarUrl
        }
      } : undefined
    },
    include: {
      avatar: true
    },
  })

  const user: User = {
    id: User.id,
    username: User.username,
    email: User.email,
    password: User.password,
    avatarUrl: User.avatar?.url || null,
    createdAt: User.createdAt,
    updatedAt: User.updatedAt,
    token: generateToken({
      id: User.id,
      username: User.username,
      email: User.email,
      avatarUrl: User.avatar?.url
    })
  }
  return {
    user: user,
    message: "User signup success"
  };
}