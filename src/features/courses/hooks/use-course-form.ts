import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApiError, getApiErrorMessage } from '@/lib/api-client';
import type { ApiErrorBody } from '@/lib/api-client';
import { createCourse } from '../api/create-courses';
import { updateCourse } from '../api/update-course';
import { courseSchema, type CourseFormData } from '../schemas/course.schema';
import type { Course, CourseMutationResult } from '../types';

interface UseCourseFormOptions {
  course?: Course | null;
  onSuccess: (result: CourseMutationResult) => void;
}

export function useCourseForm({ course, onSuccess }: UseCourseFormOptions) {
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: course?.title ?? '',
      description: course?.description ?? '',
    },
  });

  const fallbackMessage = course
    ? 'Something went wrong while updating the course.'
    : 'Something went wrong while creating the course.';

  const onSubmit = handleSubmit(async (data) => {
    setApiError(null);
    clearErrors();

    try {
      const result = course
        ? await updateCourse(course.id, data)
        : await createCourse(data);

      onSuccess(result);
    } catch (error) {
      if (error instanceof ApiError && error.data) {
        const errorData = error.data as ApiErrorBody;

        if (errorData.errors) {
          Object.entries(errorData.errors).forEach(([field, message]) => {
            if (field === 'title' || field === 'description') {
              setError(field, { type: 'server', message });
            }
          });
          return;
        }
      }

      setApiError(getApiErrorMessage(error, fallbackMessage));
    }
  });

  return { register, onSubmit, errors, isSubmitting, apiError };
}
