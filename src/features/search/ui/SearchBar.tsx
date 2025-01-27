'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { RecycleDetail } from '../model/types';
import { getRecycleDetails } from '../api/getRecycleDetails';

export default function SearchBar() {
  const [allRecycle, setAllRecycle] = useState<RecycleDetail[]>([]);
  const [searchItem, setSearchItem] = useState('');
  const [filteredData, setFilteredData] = useState<RecycleDetail[]>([]);
  const router = useRouter();

  const handleSearch = () => {
    const filtered = allRecycle.filter((item) =>
      item.title.toLowerCase().includes(searchItem.toLowerCase()),
    );
    setFilteredData(filtered);
  };

  const handleItemClick = (id: number) => {
    router.push(`/recycle/detail/${id}`);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    const fetchRecycleDetails = async () => {
      try {
        const recycleDetails = await getRecycleDetails();
        setAllRecycle(recycleDetails);
      } catch (error) {
        console.error('Failed to fetch recycle details:', error);
      }
    };

    fetchRecycleDetails();
  }, []);

  return (
    <div className='mt-10 flex w-full flex-col items-center justify-center gap-2'>
      <h1 className='text-[15px] font-bold md:text-[25px]'>
        원하시는 제품에 대한 재활용 정보를 빠르게 검색해보세요!
      </h1>
      <div>
        <input
          type='text'
          placeholder='찾으시는 제품을 입력해주세요.'
          className='h-12 w-[300px] rounded-3xl border-2 border-green-500 pl-4 text-sm md:w-[450px] lg:w-[600px]'
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          className='ml-2 h-10 w-[64px] rounded-md bg-green-400 text-white'
          onClick={handleSearch}
        >
          검색
        </button>
      </div>
      <div className='mt-4'>
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div
              key={item.id}
              className='mb-4 cursor-pointer rounded-lg border p-4 hover:bg-gray-100'
              onClick={() => handleItemClick(item.id)}
            >
              <h2 className='mb-2 text-xl font-bold'>{item.title}</h2>
              <Image
                src={item.imgUrl}
                alt={item.title}
                width={128}
                height={128}
                className='mb-2 object-cover'
              />
              <p className='mb-1'>
                <strong>분류:</strong> {item.type}
              </p>
              <p className='mb-1'>
                <strong>재활용 방법:</strong> {item.context}
              </p>
              <p>
                <strong>주의사항:</strong> {item.subcontext}
              </p>
            </div>
          ))
        ) : (
          <p>해당되는 재활용품 정보가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
