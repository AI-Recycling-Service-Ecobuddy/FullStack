'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { boardProps } from '../model/types';
import { getBoard } from '../api/getBoard';

export default function BoardList() {
  const [board, setBoard] = useState<boardProps[]>([]);
  const router = useRouter();

  const handleClick = async (id: string) => {
    router.push(`/board/${id}`);
  };

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const res = await getBoard();
        setBoard(res);
      } catch (error) {
        console.error('Failed to fetch board:', error);
      }
    };
    fetchBoard();
  }, []);
  return (
    <>
      {board.map((item, idx) => (
        <tr key={idx + 1} className='hover:bg-gray-50'>
          <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'>
            {idx + 1}
          </td>
          <td
            className='max-w-[200px] cursor-pointer truncate px-6 py-4 text-sm text-blue-600 hover:underline lg:max-w-[500px]'
            onClick={() => handleClick(item.id)}
          >
            {item.title}
          </td>
          <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
            {item.writer}
          </td>
          <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
            {item.date}
          </td>
        </tr>
      ))}
    </>
  );
}
