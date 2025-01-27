import Link from 'next/link';
import BoardList from '../../src/features/board/ui/BoardList';
import { auth } from '../auth';
import { redirect } from 'next/navigation';

export default async function BoardPage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className='container mx-auto p-6'>
      <h1 className='mb-6 text-center text-3xl font-bold text-gray-800'>
        정보 게시판
      </h1>
      <div className='overflow-hidden rounded-lg bg-white shadow-md'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-green-300'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
                번호
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
                제목
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
                작성자
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
                작성일
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 bg-white'>
            <BoardList />
          </tbody>
        </table>
      </div>
      <div className='mt-6 flex justify-end'>
        <Link
          href={'/board/newboard'}
          className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600'
        >
          글쓰기
        </Link>
      </div>
    </div>
  );
}
