'use client';

import { SignOutButton } from '@/src/features/auth';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Toggle() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div className='relative mr-5 flex w-full items-center justify-end lg:hidden'>
      {session && (
        <section className='mr-[30px] flex w-full flex-1 items-center justify-center'>
          <h1 className='mr-2 whitespace-nowrap text-center text-lg font-semibold text-white'>
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
        className='cursor-pointer rounded-md bg-emerald-800 p-1 hover:bg-emerald-700'
        src='/toggle.svg'
        width={45}
        height={45}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        alt='Toggle menu'
      />

      {isMenuOpen && (
        <div className='absolute right-0 top-full z-50 mt-2 w-[120px] rounded-lg bg-emerald-800 p-4 font-semibold shadow-lg lg:hidden'>
          <Link
            href='/about'
            className='block py-2 text-white hover:text-emerald-200'
          >
            About us
          </Link>
          <Link
            href='/board'
            className='block py-2 text-white hover:text-emerald-200'
          >
            정보게시판
          </Link>
          <Link
            href='/map'
            className='block py-2 text-white hover:text-emerald-200'
          >
            재활용 지도
          </Link>
          {session ? (
            <SignOutButton />
          ) : (
            <Link
              href='/login'
              className='my-1 rounded-lg bg-green-400 px-3 py-1 font-semibold text-white transition-colors hover:bg-green-500'
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
