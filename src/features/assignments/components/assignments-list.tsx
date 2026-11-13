import { useEffect, useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getApiErrorMessage } from '@/lib/api-client';
import type { Role } from '@/features/auth/types';
import { getAssignments } from '../api/get-assignments';
import type {
  Assignment,
  AssignmentMutationResult,
  PaginatedAssignments,
} from '../types';
import { AssignmentFormDialog } from './assignment-form-dialog';
import { AssignmentResultDialog } from './assignment-result-dialog';
import { DeleteAssignmentDialog } from './delete-assignment-dialog';

const ASSIGNMENTS_PER_PAGE = 10;

interface AssignmentResult {
  title: string;
  message: string;
  assignment?: Assignment;
}

interface AssignmentsListProps {
  role: Role;
  currentUserId: number;
  currentUserName: string;
}

export function AssignmentsList({
  role,
  currentUserId,
  currentUserName,
}: AssignmentsListProps) {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [meta, setMeta] = useState<PaginatedAssignments['meta'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [reloadToken, setReloadToken] = useState(0);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] =
    useState<Assignment | null>(null);
  const [deletingAssignment, setDeletingAssignment] =
    useState<Assignment | null>(null);
  const [result, setResult] = useState<AssignmentResult | null>(null);

  const userId = role === 'STUDENT' ? currentUserId : undefined;

  useEffect(() => {
    let isActive = true;

    const fetchAssignments = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getAssignments({
          page,
          limit: ASSIGNMENTS_PER_PAGE,
          userId,
        });

        if (!isActive) return;

        setAssignments(data.data);
        setMeta(data.meta);
      } catch (err) {
        if (!isActive) return;

        setError(
          getApiErrorMessage(
            err,
            'Something went wrong while loading assignments.',
          ),
        );
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    fetchAssignments();

    return () => {
      isActive = false;
    };
  }, [page, reloadToken, userId]);

  const openCreateForm = () => {
    setEditingAssignment(null);
    setIsFormOpen(true);
  };

  const openEditForm = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingAssignment(null);
  };

  const handleFormSuccess = (mutation: AssignmentMutationResult) => {
    const wasEditing = Boolean(editingAssignment);

    setIsFormOpen(false);
    setEditingAssignment(null);
    setResult({
      title: wasEditing ? 'Assignment updated' : 'Assignment created',
      message: mutation.message,
      assignment: mutation.assignment,
    });
    setReloadToken((token) => token + 1);
  };

  const handleDeleteSuccess = ({
    message,
    assignment,
  }: {
    message: string;
    assignment: Assignment;
  }) => {
    const wasLastOnPage = assignments.length === 1 && page > 1;

    setDeletingAssignment(null);
    setResult({ title: 'Assignment deleted', message, assignment });

    if (wasLastOnPage) {
      setPage((current) => Math.max(1, current - 1));
    } else {
      setReloadToken((token) => token + 1);
    }
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {meta
            ? `${meta.totalItems} assignment${
                meta.totalItems === 1 ? '' : 's'
              }`
            : ''}
        </p>
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Create assignment"
          title="Create assignment"
          onClick={openCreateForm}
        >
          <Plus />
        </Button>
      </div>

      {isLoading ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Loading assignments...
        </p>
      ) : error ? (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-900/10 dark:text-red-400"
        >
          {error}
        </p>
      ) : assignments.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {role === 'STUDENT'
            ? 'You have no assignments yet.'
            : 'No assignments available.'}
        </p>
      ) : (
        <ul className="space-y-3">
          {assignments.map((assignment) => (
            <li
              key={assignment.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-gray-800"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                    {assignment.course.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Assigned to {assignment.user.name}
                  </p>
                  <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
                    Created {assignment.createdAt.toLocaleDateString()} ·
                    Updated {assignment.updatedAt.toLocaleDateString()}
                  </p>
                </div>
                {role === 'ADMIN' && (
                  <div className="flex shrink-0 items-center gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Edit assignment for ${assignment.user.name}`}
                      title="Edit assignment"
                      onClick={() => openEditForm(assignment)}
                    >
                      <Pencil />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Delete assignment for ${assignment.user.name}`}
                      title="Delete assignment"
                      onClick={() => setDeletingAssignment(assignment)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {!isLoading && !error && meta && meta.totalPages > 1 && (
        <nav
          className="flex items-center justify-between gap-4 pt-2"
          aria-label="Assignments pagination"
        >
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!meta.hasPrevPage}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
          >
            Previous
          </Button>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Page {meta.currentPage} of {meta.totalPages}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!meta.hasNextPage}
            onClick={() => setPage((current) => current + 1)}
          >
            Next
          </Button>
        </nav>
      )}

      {isFormOpen && (
        <AssignmentFormDialog
          key={editingAssignment?.id ?? 'new'}
          role={role}
          currentUserId={currentUserId}
          currentUserName={currentUserName}
          assignment={editingAssignment}
          onClose={closeForm}
          onSuccess={handleFormSuccess}
        />
      )}

      {deletingAssignment && (
        <DeleteAssignmentDialog
          assignment={deletingAssignment}
          onClose={() => setDeletingAssignment(null)}
          onSuccess={handleDeleteSuccess}
        />
      )}

      {result && (
        <AssignmentResultDialog
          title={result.title}
          message={result.message}
          assignment={result.assignment}
          onClose={() => setResult(null)}
        />
      )}
    </section>
  );
}
