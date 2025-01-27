'use client';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { SignOutButton } from '@/src/features/auth';

export default function NavbarLinks() {
  const { data: session } = useSession();

  return (
    <div className='relative flex w-full items-center justify-center'>
      <div className='hidden items-center space-x-6 text-lg lg:flex'>
        <Link href='/about'>
          <span className='font-bold text-white hover:text-emerald-200'>
            서비스 소개
          </span>
        </Link>
        <Link href='/board'>
          <span className='font-bold text-white hover:text-emerald-200'>
            정보게시판
          </span>
        </Link>
        <Link href='/map'>
          <span className='font-bold text-white hover:text-emerald-200'>
            재활용 지도
          </span>
        </Link>
      </div>

      <div className='absolute right-1 top-0 hidden items-center justify-center lg:flex'>
        {session ? (
          <>
            <div className='mr-6 flex items-center gap-4'>
              <h1 className='text-lg font-semibold text-white'>
                {session.user?.name} 님
              </h1>
              <Image
                src={session.user?.image || '/defaultProfile.webp'}
                width={40}
                height={40}
                className='rounded-full'
                alt='user-image'
              />
            </div>
            <SignOutButton />
          </>
        ) : (
          <Link
            href='/login'
            className='rounded-lg bg-green-400 px-3 py-2 font-semibold text-white transition-colors hover:bg-green-500'
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}
