import News from '@/src/features/news/ui/News';
import { SearchBar } from '@/src/features/search';
import Swipers from '@/src/widgets/recycle/Swipers';
import Image from 'next/image';

export default function Page() {
  return (
    <main className='flex min-h-screen w-full flex-col items-center'>
      <section className='relative h-[500px] w-full md:h-[600] lg:h-[750px]'>
        <Image
          alt='saveforest-bg'
          src='/saveforest.webp'
          fill
          priority
          className='w-full object-cover brightness-75'
        />
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center'>
          <h1 className='text-[50px] font-bold text-white'>MAKE THIS WORLD</h1>
          <div className='mt-4 rounded-xl bg-black/50 p-1'>
            <h2 className='text-center text-[30px] font-semibold text-white'>
              The Better Place
            </h2>
          </div>
        </div>
      </section>
      <section className='w-full'>
        <div className='mb-[50px]'>
          <SearchBar />
        </div>
        <div className='shadow-lg'>
          <Swipers />
        </div>
      </section>

      <section className='relative w-full'>
        <Image
          src='/nature.webp'
          fill
          priority
          alt='nature background'
          className='object-cover'
        />
        <div className='relative z-10'>
          <News />
        </div>
      </section>
    </main>
  );
}
