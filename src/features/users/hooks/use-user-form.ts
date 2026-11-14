import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApiError, getApiErrorMessage } from '@/lib/api-client';
import type { ApiErrorBody } from '@/lib/api-client';
import { createUser } from '../api/create-user';
import { updateUserProfile } from '../api/update-user-profile';
import {
  getUserFormSchema,
  type UserFormData,
} from '../schemas/user.schema';
import {
  ROLE_TO_API,
  type User,
  type UserMutationResult,
} from '../types';

interface UseUserFormOptions {
  user?: User | null;
  onSuccess: (result: UserMutationResult) => void;
}

const FORM_FIELDS: Array<keyof UserFormData> = [
  'name',
  'email',
  'password',
  'role',
];

export function useUserForm({ user, onSuccess }: UseUserFormOptions) {
  const [apiError, setApiError] = useState<string | null>(null);
  const isEditing = Boolean(user);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(getUserFormSchema(isEditing)),
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      password: '',
      role: user?.role ?? 'STUDENT',
    },
  });

  const fallbackMessage = isEditing
    ? 'Something went wrong while updating the user.'
    : 'Something went wrong while creating the user.';

  const onSubmit = handleSubmit(async (data) => {
    setApiError(null);
    clearErrors();

    try {
      if (user) {
        if (!data.role) {
          setApiError('Role is required.');
          return;
        }

        const result = await updateUserProfile(
          user.id,
          {
            name: data.name,
            email: data.email,
            role: ROLE_TO_API[data.role],
          },
          user.role,
        );

        onSuccess(result);
        return;
      }

      if (!data.password) {
        setApiError('Password is required.');
        return;
      }

      const result = await createUser({
        name: data.name,
        email: data.email,
        password: data.password,
        role: ROLE_TO_API[data.role],
      });

      onSuccess(result);
    } catch (error) {
      if (error instanceof ApiError && error.data) {
        const errorData = error.data as ApiErrorBody;

        if (errorData.errors) {
          Object.entries(errorData.errors).forEach(([field, message]) => {
            if (FORM_FIELDS.includes(field as keyof UserFormData)) {
              setError(field as keyof UserFormData, {
                type: 'server',
                message,
              });
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
