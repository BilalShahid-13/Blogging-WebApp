import z from "zod"

export const userSchema = z.object({
  username: z.string().min(2, { message: "Username must be at least 2 characters long" }),
  email: z.email(
    "Invalid email address"
  ),
  password: z.string(),
  avatarUrl: z.url().nullable().optional()
})

export const loginSchema = z.object({
  email: z.email(
    "Invalid email address"
  ),
  password: z.string(),
})