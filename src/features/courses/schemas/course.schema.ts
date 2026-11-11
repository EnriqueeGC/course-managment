import { z } from 'zod';

export const courseSchema = z.object({
  title: z.string().trim().min(1, { message: 'Title is required' }),
  description: z.string().trim().min(1, { message: 'Description is required' }),
});

export type CourseFormData = z.infer<typeof courseSchema>;
