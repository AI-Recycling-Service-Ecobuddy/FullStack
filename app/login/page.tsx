import Image from 'next/image';
import { LoginForm } from '@/src/features/auth';
import GoogleSignInButton from '@/src/features/auth/ui/GoogleSignInButton';

export default function LoginPage() {
  return (
    <div className='relative flex h-screen items-center justify-center'>
      <Image
        src='/nature.webp'
        fill
        priority
        alt='nature background'
        className='object-cover'
      />
      <section className='z-50 flex flex-col rounded-md bg-white/40 p-8 shadow-lg'>
        <LoginForm />
        <GoogleSignInButton />
      </section>
    </div>
  );
}
