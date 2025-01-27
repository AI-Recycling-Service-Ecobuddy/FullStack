'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface BoardProps {
  id: string;
  writer: string;
  title: string;
  body: string;
  date: string;
}

export default function Board() {
  const [board, setBoard] = useState<BoardProps | null>(null);
  const router = useRouter();
  const { id } = useParams();

  const getBoard = async () => {
    try {
      const res = await axios.get(`/api/board?id=${id}`);
      setBoard(res.data[0]);
    } catch (error) {
      console.log('Info Page get 에러', error);
    }
  };

  useEffect(() => {
    getBoard();
  }, [id]);

  if (!board) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <div className='h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-green-500'></div>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <button
        onClick={() => router.back()}
        className='mb-6 flex w-full items-center justify-end font-bold text-green-600 transition-colors duration-200 hover:text-green-800'
      >
        뒤로 가기
      </button>
      <div className='overflow-hidden rounded-lg bg-white shadow-lg'>
        <div className='bg-green-400 p-4'>
          <h1 className='text-2xl font-bold text-white'>{board.title}</h1>
        </div>
        <div className='p-6'>
          <div className='mb-4 flex justify-between text-[14px] text-gray-600'>
            <h1>작성자: {board.writer}</h1>
            <h1>게시일: {board.date}</h1>
          </div>
          <div className='whitespace-pre-wrap text-gray-800'>{board.body}</div>
        </div>
      </div>
    </div>
  );
}
