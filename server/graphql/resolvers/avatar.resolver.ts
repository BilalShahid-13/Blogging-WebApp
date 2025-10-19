import { db } from "@/lib/db";
import { Avatar } from "@/types";
import { ZodValidator } from "@/utils/zodError";
import { avatarSchema } from "@/zodSchema/avatar.zod.schema";
import { avatarUpdateHandler } from "../handlers/avatar/update.handler";

export const avatarResolvers = {
  Mutation: {
    createAvatar: async (parent: any, args: Avatar) => {
      const zodValidator = new ZodValidator(avatarSchema);
      zodValidator.validate({
        buffer: args.buffer,
        token: args.token
      });
      return await db.prismaConfigure(
        async () => await avatarUpdateHandler(args)
      )
    }
  }
}