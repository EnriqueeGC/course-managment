import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApiError, getApiErrorMessage } from '@/lib/api-client';
import type { ApiErrorBody } from '@/lib/api-client';
import type { ApiUser } from '@/features/auth/types';
import { updateUserProfile } from '../api/update-user-profile';
import {
  updateUserProfileSchema,
  type UpdateUserProfileFormData,
} from '../schemas/user.schema';
import type { UserMutationResult } from '../types';

interface UseUserProfileFormOptions {
  user: ApiUser;
  onSuccess: (result: UserMutationResult) => void;
}

const PROFILE_FIELDS: Array<keyof UpdateUserProfileFormData> = [
  'name',
  'email',
];

export function useUserProfileForm({
  user,
  onSuccess,
}: UseUserProfileFormOptions) {
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserProfileFormData>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setApiError(null);
    clearErrors();

    try {
      const result = await updateUserProfile(
        user.id,
        {
          name: data.name,
          email: data.email,
        },
        user.role,
      );

      onSuccess(result);
    } catch (error) {
      if (error instanceof ApiError && error.data) {
        const errorData = error.data as ApiErrorBody;

        if (errorData.errors) {
          Object.entries(errorData.errors).forEach(([field, message]) => {
            if (
              PROFILE_FIELDS.includes(field as keyof UpdateUserProfileFormData)
            ) {
              setError(field as keyof UpdateUserProfileFormData, {
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
          'Something went wrong while updating your profile.',
        ),
      );
    }
  });

  return { register, onSubmit, errors, isSubmitting, apiError };
}
