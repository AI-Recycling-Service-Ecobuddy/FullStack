'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';

interface Position {
  lat: number;
  lng: number;
}

export default function NaverMap() {
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null);
  const [naverMapLoaded, setNaverMapLoaded] = useState(false);

  useEffect(() => {
    // 현재 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        },
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (naverMapLoaded && window.naver && currentPosition) {
      const mapOptions = {
        center: new window.naver.maps.LatLng(
          currentPosition.lat,
          currentPosition.lng,
        ),
        zoom: 15,
      };

      const map = new window.naver.maps.Map('map', mapOptions);

      // 기본 마커 추가
      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(
          35.8662910116539,
          128.63429893576,
        ),
        map,
      });

      // 현재 위치 마커 추가
      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(
          currentPosition.lat,
          currentPosition.lng,
        ),
        map,
        icon: {
          url: 'https://img.icons8.com/fluency/48/000000/user-location.png',
          size: new window.naver.maps.Size(48, 48),
        },
      });
    }
  }, [naverMapLoaded, currentPosition]);

  return (
    <div className='relative h-96 w-full'>
      {/* 네이버 지도 스크립트 로드 */}
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
        onLoad={() => setNaverMapLoaded(true)}
        strategy='lazyOnload'
      />

      <div id='map' className='h-full w-full'>
        {!naverMapLoaded && (
          <div className='flex h-full w-full items-center justify-center'>
            Loading map...
          </div>
        )}
      </div>
    </div>
  );
}
