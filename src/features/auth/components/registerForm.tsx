import { useRegisterForm } from '../hooks/useRegisterForm';

export function RegisterForm() {
  const { register, onSubmit, errors, isSubmitting, apiError, } =
    useRegisterForm();

  return (
    <div className="bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      {/* <div className="w-full bg-white rounded-lg shadow dark:border mx-auto mt-10 md:mt-0 sm:max-w-md lg:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700"> */}
      <div className='w-full max-w-2xl bg-white rounded-lg shadow dark:border 
            dark:bg-gray-800 dark:border-gray-700 mx-auto mt-10'>
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create an account
          </h2>
          <div className="flex-1 border-t border-gray-600"></div>
          <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
            {apiError && (
              <p
                role="alert"
                className="text-sm text-red-600 dark:text-red-400"
              >
                {apiError}
              </p>
            )}
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="email"
              >
                Your name:
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                {...register('name')}
                placeholder="Your name"
                required
                autoComplete="name"
              />
              {errors.name && (
                <span className="text-xs text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="email"
              >
                Your email
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="email"
                {...register('email')}
                placeholder="youremail@example.com"
                required
                autoComplete="email"
              />
              {errors.email && (
                <span className="text-xs text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="password"
                {...register('password')}
                name="password"
                id="password"
                required
                placeholder="••••••••"
                autoComplete="current-password"
              />
              {errors.password && (
                <span className="text-xs text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-black focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create account'}
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{' '}
              <a
                href="#"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
               Log in 
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
