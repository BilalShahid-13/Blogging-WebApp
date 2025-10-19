import { db } from "@/lib/db";
import { generateToken } from "@/lib/token";
import { CreateUserResponse, User } from "@/types";
import { comparePassword } from "@/utils/bcrypt";
import { GraphQLError } from "graphql";

export async function loginHandler(args: User): Promise<CreateUserResponse> {
  const existingUser = await db.prisma.user.findUnique({
    where: {
      email: args.email,
    },
    include: {
      avatar: true  // ← Add this to include avatar relation
    }
  })
  if (!existingUser) {
    throw new GraphQLError("User not found", {
      extensions: { code: "USER_NOT_FOUND" },
    });
  }
  const compare = await comparePassword(args.password, existingUser.password)
  if (!compare) {
    throw new GraphQLError("Invalid credentials", {
      extensions: { code: "INVALID_CREDENTIALS" },
    });
  }
  const user: User = {
    id: existingUser.id,
    username: existingUser.username,
    email: existingUser.email,
    password: existingUser.password,
    avatarUrl: existingUser.avatar?.url || null,
    token: generateToken({
      id: existingUser.id,
      email: existingUser.email,
      username: existingUser.username,
      avatarUrl: existingUser.avatar?.url
    })
  }
  return {
    user: user,
    message: "User login success"
  };
}


export function errorHandler(error: any) {
  throw new GraphQLError("Internal Server Error", {
    extensions: { code: "INTERNAL_SERVER_ERROR", details: error.message },
  });

}
