import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormData } from '../schemas/login.schema';
import { useAuth } from '@/features/auth/context/auth.context';
import { ApiError } from '@/lib/api-client';
import { useState } from 'react';

interface ApiErrorData {
  message?: string;
  errors?: Record<string, string>;
}

export function useRegisterForm(){
    const { register: registerUser } = useAuth();
    const [apiError, setApiError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: {errors, isSubmitting},
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = handleSubmit(async (data) => {
        setApiError(null)
        clearErrors()

        try {
            await registerUser(data);
        } catch (error) {
            if (error instanceof ApiError && error.data) {
                const errorData = error.data as ApiErrorData;
                if (errorData.errors) {
                    Object.entries(errorData.errors).forEach(([field, message]) => {
                        setError(field as keyof RegisterFormData, {
                            type: 'server',
                            message,
                        });
                    });
                } else if (errorData.message) {
                    setApiError(errorData.message);
                } else {
                    setApiError("Registration failed");
                }
            } else {
                setApiError('Something went wrong, please try again');
            }
        }
    });


    return {
        register,
        onSubmit,
        errors,
        apiError,
        isSubmitting,
    };
}