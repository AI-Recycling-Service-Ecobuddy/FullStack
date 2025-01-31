'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { SignInButton, SignOutButton } from '@/src/features/auth';
import UserProfile from './UserProfile';
import NavItem from './NavItem';

export default function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className='fixed top-0 left-0 z-50 flex h-[70px] w-full items-center justify-between bg-emerald-600 px-6'>
      {/* 로고 */}
      <Link
        href='/'
        className='flex w-[100px] transform justify-center duration-200 hover:scale-105'
      >
        <Image
          src='/logo.webp'
          width={60}
          height={60}
          alt='logo'
          className='rounded-full bg-red-400'
        />
      </Link>

      {/* 네비게이션 메뉴 (중앙) */}
      <div className='hidden space-x-6 text-lg lg:flex'>
        <NavItem href='/about' label='서비스 소개' />
        <NavItem href='/board' label='정보게시판' />
        <NavItem href='/map' label='재활용 지도' />
      </div>

      {/* 사용자 정보 및 로그아웃 버튼 (우측) */}
      <div className='hidden items-center space-x-4 lg:flex'>
        {session ? <UserProfile session={session} /> : <SignInButton />}
      </div>

      {/* 모바일 메뉴 버튼 */}
      <div className='lg:hidden'>
        <Image
          className='cursor-pointer rounded-md bg-emerald-800 p-1 hover:bg-emerald-700'
          src='/toggle.svg'
          width={45}
          height={45}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          alt='Toggle menu'
        />
      </div>

      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <div className='absolute top-full right-0 z-50 mt-2 w-[150px] rounded-lg bg-emerald-800 p-4 shadow-lg'>
          <NavItem href='/about' label='서비스 소개' mobile />
          <NavItem href='/board' label='정보게시판' mobile />
          <NavItem href='/map' label='재활용 지도' mobile />
          {session ? <SignOutButton /> : <SignInButton />}
        </div>
      )}
    </nav>
  );
}
