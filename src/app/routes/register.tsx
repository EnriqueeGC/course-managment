import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '@/features/auth/components/registerForm';

export default function RegisterRoute() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex items-center justify-center">
      <RegisterForm
        // onSuccess={() => navigate('/dashboard', { replace: true })}
      />
    </main>
  );
}
