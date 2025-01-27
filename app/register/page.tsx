import { RegisterForm } from '@/src/features/auth';
import Image from 'next/image';

export default function RegisterPage() {
  return (
    <div className='relative flex h-screen items-center justify-center bg-slate-100'>
      <Image
        src='/nature.webp'
        fill
        priority
        alt='nature background'
        className='object-cover'
      />
      <RegisterForm />
    </div>
  );
}
