'use client';

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Userinfo() {
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <div className='relative grid h-full w-full place-items-center'>
      <Image
        src='/nature.webp'
        fill
        priority
        alt='nature background'
        className='object-cover'
      />
      <div className='z-10 my-6 flex flex-col gap-2 rounded-lg bg-zinc-300/60 p-10 shadow-lg'>
        <div className='flex flex-col items-center justify-center gap-4'>
          <h1 className='mb-10 text-4xl font-bold text-green-500'>EDDY</h1>
          <h3 className='text-2xl'>
            안녕하세요!{' '}
            <span className='font-bold text-green-500'>
              {session?.user?.name}
            </span>
            <span> 님</span>
          </h3>
        </div>
        <div>
          이메일: <span className='font-bold'>{session?.user?.email}</span>
        </div>
        <button
          onClick={handleSignOut}
          className='mt-3 cursor-pointer rounded-lg bg-red-500 px-6 py-2 font-bold text-white transition duration-300 hover:bg-red-600'
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
