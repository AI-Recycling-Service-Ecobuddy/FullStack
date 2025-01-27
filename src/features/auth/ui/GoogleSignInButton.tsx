import { signIn } from '@/app/auth';

export default function GoogleSignInButton() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('google', {
          redirectTo: '/dashboard',
        });
      }}
    >
      <button
        type='submit'
        className='w-[380px] rounded-3xl bg-blue-500 px-[20px] py-[8px] font-bold text-white duration-200 hover:scale-105'
      >
        Signin with Google
      </button>
    </form>
  );
}
