import Image from 'next/image';
import Link from 'next/link';
import Toggle from './Toggle';
import NavbarLinks from './NavbarLinks';

export default function Navbar() {
  return (
    <nav className='fixed left-0 top-0 z-50 flex h-[70px] w-full items-center justify-between bg-emerald-600'>
      <Link
        href='/'
        className='ml-[30px] flex w-[100px] transform justify-center duration-200 hover:scale-105'
      >
        <Image
          src='/logo.webp'
          width={60}
          height={60}
          alt='logo'
          className='rounded-full bg-red-400'
        />
      </Link>
      <div className='flex w-full items-center justify-center pr-[20px]'>
        <NavbarLinks />
      </div>
      <Toggle />
    </nav>
  );
}
