import { LoginForm } from '@/features/auth/components/authForm';
import { WelcomeBack } from '@/components/auth/WelcomeBack';
import { useAuth } from '@/features/auth/context/auth.context';
import { Link } from 'react-router-dom';

export function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Loading…</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center flex-row">
        <WelcomeBack />
      </div>
    );
  }

  return (
    <div className="grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-6">
        {/* left  */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-500 border border-brand-200 dark:border-brand-400/20 text-xs font-semibold">
            <span className="flex h-2 w-2 rounded-full bg-brand-400"></span>
            <span>Managment plataform for the next generation</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            <span className="bg-gradient-to-r from-brand-600 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
              CourseManagment
            </span>
          </h1>
          <div className="space-y-4 text-left pt-2">
            <div className="flex items-start space-x-4 p-3 rounded-2xl transition-all hover:bg-white dark:hover:bg-slate-900/50 hover:shadow-sm border border-transparent hover:border-slate-200/60 dark:hover:border-slate-800">
              <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <i className="fa-solid fa-shapes text-lg"></i>
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  Course Managment
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Organize and manage avaible courses
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4 text-left pt-2">
            <div className="flex items-start space-x-4 p-3 rounded-2xl transition-all hover:bg-white dark:hover:bg-slate-900/50 hover:shadow-sm border border-transparent hover:border-slate-200/60 dark:hover:border-slate-800">
              <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <i className="fa-solid fa-users-gear text-lg"></i>
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  User Managment
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Manage students and admin accounts.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4 text-left pt-2">
            <div className="flex items-start space-x-4 p-3 rounded-2xl transition-all hover:bg-white dark:hover:bg-slate-900/50 hover:shadow-sm border border-transparent hover:border-slate-200/60 dark:hover:border-slate-800">
              <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <i className="fa-solid fa- text-lg"></i>
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  Course Enrollment
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Let students choose their courses.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200/80 dark:border-slate-800 transition-all">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
