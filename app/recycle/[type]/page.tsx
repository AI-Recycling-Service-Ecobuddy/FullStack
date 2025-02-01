import Image from 'next/image';
import DetailLink from '../../../src/features/recycle/ui/DetailLink';

export default function RecyclePages() {
  return (
    <div className='flex h-full items-center justify-center'>
      <Image
        src='/nature.webp'
        fill
        priority
        alt='nature background'
        className='fixed top-0 left-0 z-0 object-cover'
      />
      <DetailLink />
    </div>
  );
}
