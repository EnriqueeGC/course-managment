import type { LucideIcon } from 'lucide-react';

interface PagePlaceholderProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function PagePlaceholder({
  title,
  description,
  icon: Icon,
}: PagePlaceholderProps) {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          {title}
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </header>

      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-gray-800">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-500">
          <Icon size={22} />
        </div>
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">
          Nothing here yet
        </h2>
        <p className="mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">
          This section is a placeholder. Future functionality will be
          implemented here.
        </p>
      </div>
    </section>
  );
}
