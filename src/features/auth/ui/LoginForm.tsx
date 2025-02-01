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
        setError('이메일 또는 비밀번호가 잘못되었습니다.');
      } else {
        router.push('/'); // 로그인 성공 시 홈으로 이동
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className='mb-4 text-center font-serif text-4xl font-bold text-green-500'>
        EDDY
      </h1>
      <div className='flex flex-col gap-6 p-6'>
        <input
          type='email'
          placeholder='email'
          className='rounded-md border border-blue-500 p-1 px-10 pl-2'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete='current-email'
        />
        <input
          type='password'
          placeholder='password'
          className='rounded-md border border-blue-500 p-1 px-10 pl-2'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='current-password'
        />
        <button className='mt-4 cursor-pointer rounded-md bg-green-400 p-1 font-semibold text-white duration-200 hover:bg-green-500'>
          로그인
        </button>
        {error && (
          <div className='mt-2 w-fit rounded-md bg-red-500 px-3 py-1 text-sm text-white'>
            {error}
          </div>
        )}

        <div className='flex justify-between'>
          <p className='text-[14px] font-semibold text-blue-700'>
            계정이 없으신가요?
          </p>
          <Link
            href={'/register'}
            className='text-[15px] font-bold text-blue-800 hover:scale-105'
          >
            가입하기
          </Link>
        </div>
      </div>
    </form>
  );
}
