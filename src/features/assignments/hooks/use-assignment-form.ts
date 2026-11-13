import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApiError, getApiErrorMessage } from '@/lib/api-client';
import type { ApiErrorBody } from '@/lib/api-client';
import type { Role } from '@/features/auth/types';
import { createAssignment } from '../api/create-assignment';
import { updateAssignment } from '../api/update-assignment';
import {
  getAssignmentFormSchema,
  type AssignmentFormData,
} from '../schemas/assignment.schema';
import type {
  Assignment,
  AssignmentCourseOption,
  AssignmentMutationResult,
  AssignmentStudentOption,
} from '../types';

interface UseAssignmentFormOptions {
  role: Role;
  currentUserId: number;
  currentUserName: string;
  assignment?: Assignment | null;
  students: AssignmentStudentOption[];
  courses: AssignmentCourseOption[];
  onSuccess: (result: AssignmentMutationResult) => void;
}

export function useAssignmentForm({
  role,
  currentUserId,
  currentUserName,
  assignment,
  students,
  courses,
  onSuccess,
}: UseAssignmentFormOptions) {
  const [apiError, setApiError] = useState<string | null>(null);
  const isEditing = Boolean(assignment);
  const requiresUser = role === 'ADMIN';

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<AssignmentFormData>({
    resolver: zodResolver(getAssignmentFormSchema(requiresUser)),
    defaultValues: {
      userId: assignment
        ? String(assignment.userId)
        : role === 'STUDENT'
          ? String(currentUserId)
          : '',
      courseId: assignment ? String(assignment.courseId) : '',
    },
  });

  const fallbackMessage = isEditing
    ? 'Something went wrong while updating the assignment.'
    : 'Something went wrong while creating the assignment.';

  const onSubmit = handleSubmit(async (data) => {
    setApiError(null);
    clearErrors();

    const userId =
      role === 'ADMIN' ? Number(data.userId) : currentUserId;
    const courseId = Number(data.courseId);

    if (!userId) {
      setApiError('Student is required.');
      return;
    }

    if (!courseId) {
      setApiError('Course is required.');
      return;
    }

    if (
      assignment &&
      assignment.userId === userId &&
      assignment.courseId === courseId
    ) {
      setApiError(
        'Select a different student or course to update this assignment.',
      );
      return;
    }

    try {
      const studentName =
        role === 'STUDENT'
          ? currentUserName
          : (students.find((student) => student.id === userId)?.name ??
            assignment?.user.name ??
            `User #${userId}`);
      const courseTitle =
        courses.find((course) => course.id === courseId)?.title ??
        assignment?.course.title ??
        `Course #${courseId}`;

      if (assignment) {
        const result = await updateAssignment(assignment.id, {
          userId,
          courseId,
        });

        onSuccess({
          message: result.message,
          assignment: {
            ...assignment,
            userId,
            courseId,
            user: { id: userId, name: studentName },
            course: { id: courseId, title: courseTitle },
            updatedAt: new Date(),
          },
        });
        return;
      }

      const result = await createAssignment({
        userId,
        courseId,
      });

      onSuccess({
        message: result.message,
        assignment: {
          id: Number(result.assignment.assignmentId),
          userId,
          courseId,
          user: { id: userId, name: studentName },
          course: { id: courseId, title: courseTitle },
          createdAt: result.assignment.createdAt
            ? new Date(result.assignment.createdAt)
            : new Date(),
          updatedAt: result.assignment.updatedAt
            ? new Date(result.assignment.updatedAt)
            : new Date(),
        },
      });
    } catch (error) {
      if (error instanceof ApiError && error.data) {
        const errorData = error.data as ApiErrorBody;

        if (errorData.errors) {
          Object.entries(errorData.errors).forEach(([field, message]) => {
            if (field === 'userId' || field === 'courseId') {
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
