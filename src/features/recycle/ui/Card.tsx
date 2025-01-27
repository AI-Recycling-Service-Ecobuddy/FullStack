'use client';
import { useCategoryStore } from '@/src/features/recycle/model/categoryStore';
import Image from 'next/image';
import Link from 'next/link';

interface RecycleProps {
  title: string;
  imgUrl: string;
}

export default function Card({ title, imgUrl }: RecycleProps) {
  const { setTitle, setImgUrl } = useCategoryStore();

  const handleCategory = () => {
    setTitle(title);
    setImgUrl(imgUrl);
  };

  return (
    <Link onClick={handleCategory} href={`/recycle/${title}`}>
      <div className='w-full h-full bg-white border-2 border-gray-300 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-400'>
        <div className='flex flex-col h-full'>
          <div className='flex justify-center font-bold'>
            <p className='text-gray-700'>{title}</p>
          </div>
          <div className='relative flex-grow h-[200px] md:h-[300px]'>
            {imgUrl && <Image src={imgUrl} alt={title} fill className='object-cover' />}
          </div>
        </div>
      </div>
    </Link>
  );
}
