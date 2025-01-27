'use client';

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import SignOutButton from '../../../features/auth/ui/SignOutButton';

export default function Toggle() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div className='lg:hidden relative mr-5 flex justify-end items-center w-full'>
      {session && (
        <section className='w-full flex-1 flex justify-center items-center mr-[30px]'>
          <h1 className='text-center text-white text-lg font-semibold mr-2 whitespace-nowrap '>
            {session?.user?.name} 님
          </h1>
          <Image
            src={session.user?.image || '/defaultProfile.webp'}
            width={40}
            height={40}
            className='rounded-full'
            alt='user-image'
          />
        </section>
      )}

      <Image
        className='bg-emerald-800 cursor-pointer hover:bg-emerald-700 rounded-md p-1'
        src='/toggle.svg'
        width={45}
        height={45}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        alt='Toggle menu'
      />

      {isMenuOpen && (
        <div className='z-50 w-[120px] font-semibold lg:hidden absolute top-full right-0 bg-emerald-800 p-4 mt-2 rounded-lg shadow-lg'>
          <Link href='/about' className='block py-2 text-white hover:text-emerald-200'>
            About us
          </Link>
          <Link href='/board' className='block py-2 text-white hover:text-emerald-200'>
            정보게시판
          </Link>
          <Link href='/chatbot' className='block py-2 text-white hover:text-emerald-200'>
            재활용 챗봇
          </Link>
          <Link href='/map' className='block py-2 text-white hover:text-emerald-200'>
            재활용 지도
          </Link>
          {session ? (
            <SignOutButton />
          ) : (
            <Link
              href='/login'
              className='bg-green-400 px-3 my-1 py-1 rounded-lg font-semibold text-white hover:bg-green-500 transition-colors'
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
