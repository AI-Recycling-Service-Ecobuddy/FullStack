import { redirect } from 'next/navigation';
import { auth } from '../auth';
import { NaverMap, NewMarkerForm } from '@/src/features/map';

export default async function MapPage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className='flex h-full w-full flex-col'>
      <div className='flex-grow'>
        <NaverMap />
      </div>
      <NewMarkerForm />
    </div>
  );
}
