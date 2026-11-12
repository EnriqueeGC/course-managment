import { z } from 'zod';

const nameSchema = z
  .string()
  .trim()
  .min(2, { message: 'Name must be between 2 and 100 characters' })
  .max(100, { message: 'Name must be between 2 and 100 characters' });

const emailSchema = z
  .string()
  .trim()
  .min(1, { message: 'Email is required' })
  .email({ message: 'Email must be valid' });

const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters' });

const roleSchema = z.enum(['ADMIN', 'STUDENT']);

export function getUserFormSchema(isEditing: boolean) {
  return z.object({
    name: nameSchema,
    email: emailSchema,
    password: isEditing ? z.string().optional() : passwordSchema,
    role: isEditing ? roleSchema : roleSchema.optional(),
  });
}

export type UserFormData = z.infer<ReturnType<typeof getUserFormSchema>>;

export const updateUserPasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(1, { message: 'Current password is required' }),
    newPassword: passwordSchema,
    confirmPassword: z
      .string()
      .min(1, { message: 'Please confirm the new password' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type UpdateUserPasswordFormData = z.infer<
  typeof updateUserPasswordSchema
>;
