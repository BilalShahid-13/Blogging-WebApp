import { db } from "@/lib/db";
import { isTokenExpired, verifyToken } from "@/lib/token";
import { Avatar, CreateAvatarResponse } from "@/types";
import { uploadToCloudinary } from "@/utils/cloudinaryUpload";
import { GraphQLError } from "graphql";

export async function avatarUpdateHandler(args: Avatar): Promise<CreateAvatarResponse> {
  try {
    const { buffer, token } = args;
    if (isTokenExpired(token)) {
      throw new GraphQLError("Token expired", {
        extensions: { code: "TOKEN_EXPIRED" }
      })
    }
    const decodeToken = verifyToken(token);
    const existingUser = await db.prisma.user.findUnique({
      where: {
        email: decodeToken?.email
      }
    })
    if (!existingUser) {
      throw new GraphQLError("User not found", {
        extensions: { code: "USER_NOT_FOUND" }
      });
    }
    const imageBuffer = Buffer.from(buffer, "base64");
    const cleanFileName = `avatar-${decodeToken?.username}`.trim();
    const result = await uploadToCloudinary(imageBuffer, cleanFileName, "avatars");
    await db.prisma.user.update({
      where: {
        email: decodeToken?.email,
      }, data: {
        avatar: {
          update: {
            url: result?.secure_url.toString(),
          }
        }
      }
    })
    return {
      message: "Avatar updated successfully",
      avatarUrl: result?.secure_url.toString()
    }
  } catch (error: any) {
    console.error("❌ Avatar update failed:", error);
    throw new GraphQLError(error?.message || "Avatar update failed", {
      extensions: { code: "AVATAR_UPDATE_ERROR" },
    });
  }
}
