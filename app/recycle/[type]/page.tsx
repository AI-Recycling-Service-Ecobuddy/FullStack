import Image from 'next/image';
import DetailLink from '../../../src/features/recycle/ui/DetailLink';

export default function RecyclePages() {
  return (
    <div className='flex justify-center items-center mt-[200px]'>
      <Image src='/nature.webp' fill priority alt='nature background' className='object-cover' />
      <DetailLink />
    </div>
  );
}
