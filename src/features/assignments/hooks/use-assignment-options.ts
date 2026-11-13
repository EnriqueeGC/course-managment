import { useEffect, useState } from 'react';
import { getApiErrorMessage } from '@/lib/api-client';
import {
  getAllCourses,
  getAllStudents,
} from '../api/get-assignment-options';
import type {
  AssignmentCourseOption,
  AssignmentStudentOption,
} from '../types';

interface UseAssignmentOptionsOptions {
  includeStudents: boolean;
}

export function useAssignmentOptions({
  includeStudents,
}: UseAssignmentOptionsOptions) {
  const [students, setStudents] = useState<AssignmentStudentOption[]>([]);
  const [courses, setCourses] = useState<AssignmentCourseOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const loadOptions = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [studentOptions, courseOptions] = await Promise.all([
          includeStudents ? getAllStudents() : Promise.resolve([]),
          getAllCourses(),
        ]);

        if (!isActive) return;

        setStudents(studentOptions);
        setCourses(courseOptions);
      } catch (err) {
        if (!isActive) return;

        setError(
          getApiErrorMessage(
            err,
            'Something went wrong while loading assignment options.',
          ),
        );
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    loadOptions();

    return () => {
      isActive = false;
    };
  }, [includeStudents]);

  return { students, courses, isLoading, error };
}
