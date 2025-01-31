'use client';

import { useRecycleStore } from '@/src/features/recycle/model/recycleDetailStore';
import Image from 'next/image';

export default function DetailPages() {
  const { title, type, imgUrl, context, subcontext } = useRecycleStore();

  return (
    <div className='relative flex h-full w-full items-center justify-center p-4'>
      <Image
        src='/nature.webp'
        fill
        priority
        alt='nature background'
        className='object-cover'
      />

      <div className='relative z-10 w-2/3 overflow-hidden rounded-lg bg-white shadow-lg'>
        <div className='relative h-96 lg:h-[550px]'>
          {imgUrl && (
            <Image src={imgUrl} alt={title} fill className='object-cover' />
          )}
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='rounded-md bg-black/45 px-4 py-2'>
              <h1 className='text-center text-4xl font-bold text-white'>
                {title}
              </h1>
            </div>
          </div>
        </div>

        <div className='p-6'>
          <h2 className='mb-4 text-2xl font-semibold text-gray-800'>
            재활용 정보
          </h2>
          <p className='text-gray-700'>{context}</p>

          <div className='mt-4 space-y-4'>
            <div className='flex items-center'>
              <span className='w-24 font-medium text-green-600'>분류:</span>
              <span className='text-gray-700'>{type}</span>
            </div>
          </div>

          <div className='mt-6 border-t border-gray-200 pt-6'>
            <h3 className='mb-2 text-lg font-semibold text-gray-800'>
              재활용 팁
            </h3>
            <p className='text-gray-600'>{subcontext}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
