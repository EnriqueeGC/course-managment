import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApiError, getApiErrorMessage } from '@/lib/api-client';
import type { ApiErrorBody } from '@/lib/api-client';
import { updateUserPassword } from '../api/update-user-password';
import {
  updateUserPasswordSchema,
  type UpdateUserPasswordFormData,
} from '../schemas/user.schema';
import type { UserPasswordResult } from '../types';

interface UseUserPasswordFormOptions {
  userId: number;
  onSuccess: (result: UserPasswordResult) => void;
}

const PASSWORD_FIELDS: Array<keyof UpdateUserPasswordFormData> = [
  'oldPassword',
  'newPassword',
  'confirmPassword',
];

export function useUserPasswordForm({
  userId,
  onSuccess,
}: UseUserPasswordFormOptions) {
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserPasswordFormData>({
    resolver: zodResolver(updateUserPasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setApiError(null);
    clearErrors();

    try {
      const result = await updateUserPassword(userId, {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });

      onSuccess(result);
    } catch (error) {
      if (error instanceof ApiError && error.data) {
        const errorData = error.data as ApiErrorBody;

        if (errorData.errors) {
          Object.entries(errorData.errors).forEach(([field, message]) => {
            if (PASSWORD_FIELDS.includes(field as keyof UpdateUserPasswordFormData)) {
              setError(field as keyof UpdateUserPasswordFormData, {
                type: 'server',
                message,
              });
            }
          });
          return;
        }
      }

      setApiError(
        getApiErrorMessage(
          error,
          'Something went wrong while updating the password.',
        ),
      );
    }
  });

  return { register, onSubmit, errors, isSubmitting, apiError };
}
