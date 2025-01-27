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
      const res = await axios.post('/api/register', {
        name,
        email,
        password,
      });

      if (res.status === 201) {
        const form = e.target as HTMLFormElement;
        form.reset();
        router.push('/');
      } else {
        console.log('User registration failed.');
      }
    } catch (error) {
      console.log('Error during registration', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='z-10 bg-white/40 shadow-lg rounded-md p-8'>
      <h1 className='text-green-500 text-4xl font-serif text-center font-bold mb-4'>EDDY</h1>
      <div className='flex flex-col p-6 gap-6 '>
        <input
          type='text'
          placeholder='Full Name'
          className='border border-blue-300 pl-2 p-1 rounded-md px-10'
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete='current-name'
        />
        <input
          type='email'
          placeholder='email'
          className='border border-blue-300 pl-2 p-1 rounded-md px-10'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete='current-email'
        />
        <input
          type='password'
          placeholder='password'
          className='border border-blue-300 pl-2 p-1 rounded-md px-10'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='current-password'
        />
        <button className='bg-green-400 rounded-md mt-4 p-1 text-white font-semibold hover:bg-green-500 duration-200'>
          가입하기
        </button>
        {error && <div>{error}</div>}
        <div className='flex justify-between mt-2'>
          <p className='text-blue-700 font-semibold text-[14px]'>계정이 이미 있으신가요?</p>
          <Link href={'/login'} className='text-blue-800 text-[15px] font-bold hover:scale-105'>
            로그인
          </Link>
        </div>
      </div>
    </form>
  );
}
