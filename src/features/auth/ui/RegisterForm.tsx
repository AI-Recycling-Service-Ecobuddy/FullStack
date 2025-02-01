'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError('All fields are necessary.');
      return;
    }

    try {
      const res = await axios.post('/api/auth/register', {
        name,
        email,
        password,
      });

      if (res.status === 201) {
        router.push('/login');
      }
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.message || 'Registration failed.');
      } else {
        setError('Network error, please try again.');
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='z-10 rounded-md bg-white/40 p-8 shadow-lg'
    >
      <h1 className='mb-4 text-center font-serif text-4xl font-bold text-green-500'>
        EDDY
      </h1>
      <div className='flex flex-col gap-6 p-6'>
        <input
          type='text'
          placeholder='Full Name'
          className='rounded-md border border-blue-300 p-1 px-10 pl-2'
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete='current-name'
        />
        <input
          type='email'
          placeholder='email'
          className='rounded-md border border-blue-300 p-1 px-10 pl-2'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete='current-email'
        />
        <input
          type='password'
          placeholder='password'
          className='rounded-md border border-blue-300 p-1 px-10 pl-2'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='current-password'
        />
        <button className='mt-4 cursor-pointer rounded-md bg-green-400 p-1 font-semibold text-white duration-200 hover:bg-green-500'>
          가입하기
        </button>
        {error && <div>{error}</div>}
        <div className='mt-2 flex justify-between'>
          <p className='text-[14px] font-semibold text-blue-700'>
            계정이 이미 있으신가요?
          </p>
          <Link
            href={'/login'}
            className='text-[15px] font-bold text-blue-800 hover:scale-105'
          >
            로그인
          </Link>
        </div>
      </div>
    </form>
  );
}
