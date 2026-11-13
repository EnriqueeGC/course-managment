import { z } from 'zod';

export function getAssignmentFormSchema(requiresUser: boolean) {
  const userIdSchema = z
    .string()
    .min(1, { message: 'Student is required' })
    .regex(/^[1-9]\d*$/, { message: 'Student is required' });

  return z.object({
    userId: requiresUser ? userIdSchema : userIdSchema.optional(),
    courseId: z
      .string()
      .min(1, { message: 'Course is required' })
      .regex(/^[1-9]\d*$/, { message: 'Course is required' }),
  });
}

export type AssignmentFormData = z.infer<
  ReturnType<typeof getAssignmentFormSchema>
>;
