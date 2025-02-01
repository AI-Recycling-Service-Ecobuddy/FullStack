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
    <div className='relative inline-block'>
      {/* 복사 완료 메시지 */}
      {copy && (
        <span className='absolute top-1/2 left-full ml-2 -translate-y-1/2 rounded bg-white px-3 py-1 text-sm font-medium whitespace-nowrap text-red-600 shadow'>
          {copy}
        </span>
      )}

      {/* 복사 버튼 */}
      <button
        onClick={handleCopy}
        className='rounded-lg bg-red-500 px-4 py-2 text-white shadow-md transition duration-200 hover:bg-red-600'
      >
        Contacts
      </button>
    </div>
  );
}
