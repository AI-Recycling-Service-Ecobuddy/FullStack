'use client';

import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useCategoryStore } from '@/src/features/recycle/model/categoryStore';
import { useRecycleStore } from '@/src/features/recycle/model/recycleDetailStore';

interface DetailProps {
  _id: string;
  title: string;
  type: string;
  imgUrl: string;
  context: string;
  subcontext: string;
}

export default function DetailLink() {
  const { title, imgUrl } = useCategoryStore();
  const [detail, setDetail] = useState<DetailProps[]>([]);
  const params = useParams();
  const type = decodeURIComponent(params.type as string);

  const { setTitle, setType, setImgUrl, setContext, setSubContext } =
    useRecycleStore();

  const onClick = useCallback(
    (item: DetailProps) => {
      setTitle(item.title);
      setType(item.type);
      setImgUrl(item.imgUrl);
      setContext(item.context);
      setSubContext(item.subcontext);
    },
    [setTitle, setType, setImgUrl, setContext, setSubContext],
  );

  useEffect(() => {
    const getDetailRecycle = async () => {
      try {
        const { data } = await axios.get(`/api/recycledetail?type=${type}`);
        if (data) setDetail(data);
      } catch (error) {
        console.error('Error fetching recycle details:', error);
      }
    };

    getDetailRecycle();
  }, [type]);

  return (
    <div className='z-20 mx-auto overflow-hidden rounded-xl bg-white p-8 shadow-lg'>
      <div className='mb-6 flex flex-col items-center justify-between md:flex-row'>
        <h1 className='mb-[20px] text-3xl font-bold text-green-800 md:mb-0'>
          {title}
        </h1>
        {imgUrl && (
          <Image
            src={imgUrl}
            alt={title}
            width={160}
            height={160}
            className='rounded-xl'
          />
        )}
      </div>

      <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-2'>
        {detail.map((item) => (
          <Link
            onClick={() => onClick(item)}
            key={item._id}
            href={`/recycle/${params.type}/${item.title}`}
          >
            <div className='cursor-pointer rounded-lg border p-4 transition duration-300 hover:shadow-md'>
              <div className='flex items-start justify-between'>
                <div>
                  <h2 className='text-xl font-semibold text-gray-900 hover:text-green-600'>
                    {item.title}
                  </h2>
                  <p className='mt-2 text-sm text-gray-600'>
                    재활용 분류: {item.type}
                  </p>
                </div>
                <Image
                  className='rounded object-cover'
                  src={item.imgUrl}
                  alt={item.title}
                  width={80}
                  height={80}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
