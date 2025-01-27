'use client';

import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.replace('/dashboard');
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError('Invalid Credentials');
        return;
      }

      router.replace('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className='text-green-500 text-4xl font-serif text-center font-bold mb-4'>EDDY</h1>
      <div className='flex flex-col p-6 gap-6 '>
        <input
          type='email'
          placeholder='email'
          className='border border-blue-500 pl-2 p-1 rounded-md px-10'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete='current-email'
        />
        <input
          type='password'
          placeholder='password'
          className='border border-blue-500 pl-2 p-1 rounded-md px-10'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='current-password'
        />
        <button className='bg-green-400 rounded-md mt-4 p-1 text-white font-semibold hover:bg-green-500 duration-200'>
          로그인
        </button>
        {error && <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>{error}</div>}

        <div className='flex justify-between'>
          <p className='text-blue-700 font-semibold text-[14px]'>계정이 없으신가요?</p>
          <Link href={'/register'} className='text-blue-800 text-[15px] font-bold hover:scale-105'>
            가입하기
          </Link>
        </div>
      </div>
    </form>
  );
}
