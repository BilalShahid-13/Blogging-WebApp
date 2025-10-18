import { db } from "@/lib/db";
import { Avatar } from "@/types";
import { uploadToCloudinary } from "@/utils/cloudinaryUpload";
import { ZodValidator } from "@/utils/zodError";
import { Request, Response } from "express";
import z from "zod";

const avatarSchema = z.object({
  email: z.email().optional(),
  fileSize: z.number(),
  fileType: z.string(),
  fileName: z.string(),
  lastModified: z.number(),
  buffer: z.string().base64(),
})

export async function createAvatar(req: Request, res: Response): Promise<void> {
  try {
    const { email, fileSize, fileType, fileName, lastModified, buffer }: Avatar = req.body;
    const zodValidator = avatarSchema.safeParse({ email, fileSize, fileType, fileName, lastModified, buffer });
    if (!zodValidator.success) {
      const validator = new ZodValidator(avatarSchema);
      res.status(400).json({
        errors: validator.formatZodErrors(zodValidator.error.issues),
      });
      return;
    }
    const imageBuffer = Buffer.from(buffer, "base64");
    const user = db.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    const result = await uploadToCloudinary(imageBuffer, fileName, "avatars");
    console.log(result?.secure_url);
    await db.prisma.user.update({
      where: {
        email: email,
      },
      data: {
        avatar: {
          create: {
            name: fileName,
            fileType: fileType,
            url: result?.secure_url.toString(),
            lastModified: new Date(lastModified),
          }
        }
      }
    })
    res.status(200).json({ message: "Success", data: { email, fileSize, fileType, fileName, lastModified, buffer } });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error });
  }
}