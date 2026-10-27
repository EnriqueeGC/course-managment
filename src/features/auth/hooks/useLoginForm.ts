import { useForm, type UseFormReturn, type FormState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '../schemas/login.schema';
import { useAuth } from '@/features/auth/context/auth.context';
import { ApiError } from '@/lib/api-client';
import { useState } from 'react';

interface ApiErrorData {
  message?: string;
  errors?: Record<string, string>;
}

export function useLoginForm(){
  const { login } = useAuth();
  const [apiError, setApiError] = useState<string | null>(null);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  }) as UseFormReturn<LoginFormData>;

  const { errors, isSubmitting } = form.formState as FormState<LoginFormData>;

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
  } = form;

  const onSubmit = handleSubmit(async (data) => {
    setApiError(null)
    clearErrors()
    try {
      await login(data);
    } catch (error) {
      if (error instanceof ApiError && error.data) {
        const errorData = error.data as ApiErrorData;
        if (errorData.errors) {
          Object.entries(errorData.errors).forEach(([field, message]) => {
            setError(field as keyof LoginFormData, {
              type: 'server',
              message,
            });
          });
        } else if (errorData.message) {
          setApiError(errorData.message);
        } else {
          setApiError("Credentials invalid");
        }
      } else {
        setApiError('Something was wrong, try again');
      }
    }
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errors.email) {
      clearErrors('email');
    }
    register('email').onChange(e);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errors.password) {
      clearErrors('password');
    }
    register('password').onChange(e);
  };

  return {
    register,
    onSubmit,
    errors,
    isSubmitting,
    apiError,
    handleEmailChange,
    handlePasswordChange,
  };
}
