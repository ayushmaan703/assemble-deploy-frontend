import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[@#$*%]/, "Password must contain at least one symbol (@, #, $, *, %)"),
});
