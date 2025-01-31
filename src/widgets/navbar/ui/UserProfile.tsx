import { SignOutButton } from '@/src/features/auth';
import Image from 'next/image';

export default function UserProfile({ session }: { session: any }) {
  return (
    <div className='flex items-center space-x-4'>
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
      <SignOutButton />
    </div>
  );
}
