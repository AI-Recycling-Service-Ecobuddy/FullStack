'use client';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import SignOutButton from '../../../features/auth/ui/SignOutButton';
import Image from 'next/image';

export default function LinksNav() {
  const { data: session } = useSession();

  return (
    <div className='relative flex items-center justify-center w-full'>
      <div className='hidden text-lg lg:flex items-center space-x-6'>
        <Link href='/about'>
          <span className='text-white font-bold hover:text-emerald-200'>서비스 소개</span>
        </Link>
        <Link href='/board'>
          <span className='text-white font-bold hover:text-emerald-200'>정보게시판</span>
        </Link>
        <Link href='/chatbot'>
          <span className='text-white font-bold hover:text-emerald-200'>재활용 챗봇</span>
        </Link>
        <Link href='/map'>
          <span className='text-white font-bold hover:text-emerald-200'>재활용 지도</span>
        </Link>
      </div>

      <div className='absolute top-0 right-1 hidden lg:flex justify-center items-center'>
        {session ? (
          <>
            <div className='flex gap-4 items-center mr-6'>
              <h1 className='text-white text-lg font-semibold'>{session.user?.name} 님</h1>
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
            className='bg-green-400 px-3 py-2 rounded-lg font-semibold text-white hover:bg-green-500 transition-colors'
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}
