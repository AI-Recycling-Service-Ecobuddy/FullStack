'use client';
import { useState } from 'react';

export default function ContactButton() {
  const [copy, setCopy] = useState<string>('');

  const handleCopy = () => {
    navigator.clipboard.writeText('eunwoo1341@gmail.com');
    setCopy('이메일이 복사되었습니다.');
    setTimeout(() => setCopy(''), 2000);
  };

  return (
    <div>
      <button
        onClick={handleCopy}
        className='rounded-lg bg-red-500 px-4 py-2 text-white shadow-md transition duration-200 hover:bg-red-600'
      >
        Contacts
      </button>
      {copy && (
        <span className='absolute top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded bg-white px-3 py-1 text-sm font-medium text-red-600 shadow'>
          {copy}
        </span>
      )}
    </div>
  );
}
