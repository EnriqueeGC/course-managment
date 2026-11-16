import { Loader2 } from 'lucide-react';
import { cn } from 'cn';

interface LoadingSpinnerProps {
  label?: string;
  fullPage?: boolean;
  className?: string;
}

export function LoadingSpinner({
  label = 'Loading...',
  fullPage = false,
  className,
}: LoadingSpinnerProps) {
  const spinner = (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"
    >
      <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );

  if (fullPage) {
    return (
      <div
        className={cn(
          'flex min-h-screen w-full items-center justify-center',
          className,
        )}
      >
        {spinner}
      </div>
    );
  }

  return <div className={className}>{spinner}</div>;
}
