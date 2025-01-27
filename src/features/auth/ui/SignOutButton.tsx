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
      className='w-[100px] font-bold bg-red-600 text-white p-[8px] rounded-3xl hover:bg-red-700 duration-200'
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
