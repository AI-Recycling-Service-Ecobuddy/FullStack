import { redirect } from 'next/navigation';
import { auth } from '../auth';
import NaverMap from '@/src/features/map/ui/NaverMap';

export default async function MapPage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return <NaverMap />;
}
