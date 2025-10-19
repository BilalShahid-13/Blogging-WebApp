import z from "zod";

export const avatarSchema = z.object({
  buffer: z.base64(),
  token: z.string(),
})