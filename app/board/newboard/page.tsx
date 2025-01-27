'use client';

import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Newboard() {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const { data: session } = useSession();

  const today = new Date();

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePost = async () => {
    try {
      const res = await axios.post('/api/board', {
        id: uuidv4(),
        writer: session?.user?.name,
        title: formData.title,
        body: formData.content,
        date: `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`,
      });

      if (res.status === 201) {
        alert('게시글이 성공적으로 추가되었습니다.');
        router.push('/board');
      } else {
        console.log('Posting failed');
      }
    } catch (error) {
      console.error('데이터 Post 실패:', error);
      alert('게시판 추가 실패 (Post)');
    }
  };

  return (
    <div className='relative mx-auto flex min-h-screen items-center justify-center'>
      <Image
        src='/nature.webp'
        fill
        priority
        alt='nature background'
        className='object-cover'
      />
      <div className='z-10 w-full max-w-2xl rounded-lg bg-emerald-200/40 p-8 shadow-lg'>
        <h1 className='my-4 rounded-md bg-green-400 py-2 text-center text-xl font-bold'>
          새 게시글 작성
        </h1>
        <form
          className='flex flex-col gap-6'
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type='text'
            name='title'
            placeholder='제목을 입력해주세요.'
            className='rounded-md py-2 pl-4 text-lg'
            value={formData.title}
            onChange={handleChange}
          />
          <textarea
            placeholder='내용을 입력해주세요.'
            name='content'
            className='h-48 resize-none rounded-md py-2 pl-4 text-lg'
            value={formData.content}
            onChange={handleChange}
          />
        </form>
        <div className='mt-6 flex justify-end'>
          <button
            onClick={handlePost}
            className='rounded-md bg-green-500 px-4 py-2 font-bold text-white transition duration-300 hover:bg-green-600'
          >
            글쓰기
          </button>
        </div>
      </div>
    </div>
  );
}
