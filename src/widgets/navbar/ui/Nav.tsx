import Image from 'next/image';
import LinksNav from './LinksNav';
import Link from 'next/link';
import Toggle from './Toggle';

export default function Nav() {
  return (
    <nav className='fixed top-0 left-0 z-50 w-full h-[70px] bg-emerald-600 flex justify-between items-center '>
      <Link href='/' className=' w-[100px] flex justify-center hover:scale-105 transform duration-200 ml-[30px]'>
        <Image src='/logo.webp' width={60} height={60} alt='logo' className=' rounded-full bg-red-400 ' />
      </Link>
      <div className='w-full flex justify-center items-center pr-[20px]'>
        <LinksNav />
      </div>
      <Toggle />
    </nav>
  );
}
