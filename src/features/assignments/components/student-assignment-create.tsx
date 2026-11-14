import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { AssignmentMutationResult } from '../types';
import { AssignmentFormDialog } from './assignment-form-dialog';
import { AssignmentResultDialog } from './assignment-result-dialog';

interface StudentAssignmentCreateProps {
  currentUserId: number;
  currentUserName: string;
}

export function StudentAssignmentCreate({
  currentUserId,
  currentUserName,
}: StudentAssignmentCreateProps) {
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [result, setResult] = useState<AssignmentMutationResult | null>(null);

  const handleSuccess = (mutation: AssignmentMutationResult) => {
    setIsFormOpen(false);
    setResult(mutation);
  };

  const handleViewCourses = () => {
    setResult(null);
    navigate('/student/courses');
  };

  return (
    <section className="space-y-4">
      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-gray-800">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-500">
          <Plus size={22} />
        </div>
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">
          Create a new assignment
        </h2>
        <p className="mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">
          Choose a course to add it to your courses.
        </p>
        <Button
          type="button"
          className="mt-5"
          onClick={() => setIsFormOpen(true)}
        >
          <Plus />
          Create assignment
        </Button>
      </div>

      {isFormOpen && (
        <AssignmentFormDialog
          role="STUDENT"
          currentUserId={currentUserId}
          currentUserName={currentUserName}
          onClose={() => setIsFormOpen(false)}
          onSuccess={handleSuccess}
        />
      )}

      {result && (
        <AssignmentResultDialog
          title="Assignment created"
          message={result.message}
          assignment={result.assignment}
          onClose={() => setResult(null)}
          action={{
            label: 'View my courses',
            onClick: handleViewCourses,
          }}
        />
      )}
    </section>
  );
}
