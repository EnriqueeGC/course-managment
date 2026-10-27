import { z } from "zod";

export const loginSchema = z.object({
  email: z
  .string()
  .min(1, { message: "Email is required"})
  .email({message: "Email must be valid"}),
  password: z
  .string()
  .min(6, {message: "Password must have 6 character"})
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = loginSchema.extend({
  name: z.string().min(1, { message: "Name is required" }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
