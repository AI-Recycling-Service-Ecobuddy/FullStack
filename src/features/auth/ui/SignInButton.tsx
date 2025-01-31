import Link from 'next/link';

export default function SignInButton() {
  return (
    <Link
      href='/login'
      className='cursor-pointer rounded-lg bg-green-400 px-3 py-2 font-semibold text-white transition-colors hover:bg-green-500'
    >
      Sign In
    </Link>
  );
}
