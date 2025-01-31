'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const SignOutButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  return (
    <button
      onClick={handleSignOut}
      className='w-[100px] cursor-pointer rounded-3xl bg-red-600 p-[8px] font-bold text-white duration-200 hover:bg-red-700'
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
