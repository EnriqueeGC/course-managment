import { getCourses } from '@/features/courses/api/get-courses';
import { getUsers } from '@/features/users/api/get-users';
import type {
  AssignmentCourseOption,
  AssignmentStudentOption,
} from '../types';

const OPTIONS_PAGE_SIZE = 100;

export async function getAllStudents(): Promise<AssignmentStudentOption[]> {
  const students: AssignmentStudentOption[] = [];
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    const response = await getUsers({ page, limit: OPTIONS_PAGE_SIZE });

    students.push(
      ...response.data.map((user) => ({
        id: user.id,
        name: user.name,
      })),
    );

    hasNextPage = response.meta.hasNextPage;
    page += 1;
  }

  return students;
}

export async function getAllCourses(): Promise<AssignmentCourseOption[]> {
  const courses: AssignmentCourseOption[] = [];
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    const response = await getCourses({ page, limit: OPTIONS_PAGE_SIZE });

    courses.push(
      ...response.data.map((course) => ({
        id: course.id,
        title: course.title,
      })),
    );

    hasNextPage = response.meta.hasNextPage;
    page += 1;
  }

  return courses;
}
