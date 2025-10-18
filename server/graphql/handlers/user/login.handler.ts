import { db } from "@/lib/db";
import { CreateUserResponse, User } from "@/types";
import { comparePassword } from "@/utils/bcrypt";
import { GraphQLError } from "graphql";

export async function loginHandler(args: User): Promise<CreateUserResponse> {
  const existingUser = await db.prisma.user.findUnique({
    where: {
      email: args.email,
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
  return {
    user: existingUser,
    message: "User login success"
  };
}


export function errorHandler(error: any) {
  throw new GraphQLError("Internal Server Error", {
    extensions: { code: "INTERNAL_SERVER_ERROR", details: error.message },
  });

}
