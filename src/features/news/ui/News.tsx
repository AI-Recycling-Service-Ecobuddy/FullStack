'use client';

import { useNewsQuery } from '../hooks/useNewsQuery';

export default function News() {
  const { data: news = [], isLoading, error } = useNewsQuery();

  if (isLoading) {
    return <p className='text-center text-gray-500'>뉴스를 불러오는 중...</p>;
  }

  if (error) {
    return (
      <p className='text-center text-red-500'>
        뉴스를 불러오는 데 실패했습니다.
      </p>
    );
  }

  return (
    <div className='mx-auto my-8 max-w-3xl'>
      <div className='mb-4 rounded-md bg-emerald-400 py-2 text-center'>
        <h1 className='text-2xl font-semibold text-white'>
          오늘의 재활용 뉴스
        </h1>
      </div>
      <ul className='space-y-4'>
        {news.map((item) => (
          <li
            key={item.link}
            className='overflow-hidden rounded-lg bg-white/60 duration-200 hover:scale-105 hover:shadow-lg'
          >
            <div className='p-6'>
              <h2
                className='mb-2 text-xl font-semibold text-gray-800'
                dangerouslySetInnerHTML={{ __html: item.title }}
              />
              <p
                className='mb-4 text-gray-600'
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
              <a
                href={item.link}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-700'
              >
                자세히 보기
              </a>
              <span className='m-4 text-sm text-gray-500'>
                {item.pubDate.split(' ').slice(1, 4).join(' ')}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
