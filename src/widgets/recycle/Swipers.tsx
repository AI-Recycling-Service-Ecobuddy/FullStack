'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Card from '../../features/recycle/ui/Card';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useState } from 'react';

const recycles = [
  {
    id: '1',
    title: '종이류',
    imgUrl: '/recycle/paper.webp',
  },
  {
    id: '2',
    title: '플라스틱류',
    imgUrl: '/recycle/plastic.webp',
  },
  {
    id: '3',
    title: '금속류',
    imgUrl: '/recycle/metal.webp',
  },
  {
    id: '4',
    title: '유리류',
    imgUrl: '/recycle/glass.webp',
  },
  {
    id: '5',
    title: '의류',
    imgUrl: '/recycle/cloth.webp',
  },
];

export default function Swipers() {
  const [currentCard, setCurrentCard] = useState(0);

  return (
    <main className='w-full flex flex-col justify-center items-center'>
      <div className='w-full bg-green-700/50 p-2 text-3xl text-white font-semibold text-center'>
        <h1 className=''>분리수거</h1>
      </div>
      {recycles.length > 0 ? (
        <Swiper
          className='w-full h-[300px] md:h-[400px] lg:h-[500px]'
          spaceBetween={10}
          slidesPerView={1}
          simulateTouch={true}
          grabCursor={true}
          centeredSlides={true}
          initialSlide={currentCard}
          onSlideChange={(swiper) => {
            setCurrentCard(swiper.snapIndex);
          }}
          observer={true}
          navigation={true}
          pagination={true}
          modules={[Navigation, Pagination, Autoplay]}
          breakpoints={{
            640: {
              slidesPerView: 1.2,
            },
            768: {
              slidesPerView: 1.3,
            },
            1024: {
              slidesPerView: 1.5,
            },
          }}
          autoplay={{
            delay: 3000, // 3초마다 슬라이드 변경
            disableOnInteraction: false, // 사용자 상호작용 후에도 자동 재생 유지
          }}
        >
          {recycles.map((item) => (
            <SwiperSlide key={item.id}>
              <Card title={item.title} imgUrl={item.imgUrl} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>Loading...</p>
      )}
      <h2 className='pt-3 pb-5 font-semibold text-center text-sm sm:text-base'>클릭하여 자세한 정보를 알아보아요!</h2>
    </main>
  );
}
