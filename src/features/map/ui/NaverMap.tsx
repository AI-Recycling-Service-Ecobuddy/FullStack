'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { useMarkersQuery } from '../hooks/useMarkersQuery';
import { Marker } from '../model/types';

export default function NaverMap() {
  const [naverMapLoaded, setNaverMapLoaded] = useState(false);
  const [map, setMap] = useState<any>(null);
  const [currentPositionMarker, setCurrentPositionMarker] = useState<any>(null);

  const { data: markers, isLoading, error } = useMarkersQuery();

  useEffect(() => {
    if (isLoading || error || !markers || !naverMapLoaded || !window.naver)
      return;

    const mapOptions = {
      center: new window.naver.maps.LatLng(37.5665, 126.978), // 기본 중심 위치 (서울)
      zoom: 12,
    };

    const mapInstance = new window.naver.maps.Map('map', mapOptions);
    setMap(mapInstance);

    // 현재 위치 가져오기 및 마커 추가
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLocation = new window.naver.maps.LatLng(
            latitude,
            longitude,
          );

          const positionMarker = new window.naver.maps.Marker({
            map: mapInstance,
            position: userLocation,
            icon: {
              url: '/map/user.webp',
              size: new window.naver.maps.Size(36, 36),
              scaledSize: new window.naver.maps.Size(36, 36),
              anchor: new window.naver.maps.Point(18, 18),
            },
          });

          setCurrentPositionMarker(positionMarker);
          mapInstance.setCenter(userLocation);
        },
        (error) => {
          console.error('Geolocation error:', error);
        },
        { enableHighAccuracy: true },
      );
    }

    // 마커 추가
    markers.forEach((marker: Marker) => {
      window.naver.maps.Service.geocode(
        { query: marker.address },
        (status, response) => {
          if (status === window.naver.maps.Service.Status.ERROR) {
            console.error('Geocoding Error:', marker.address);
            return;
          }

          if (response.v2.addresses.length > 0) {
            const { x, y } = response.v2.addresses[0];

            const markerInstance = new window.naver.maps.Marker({
              position: new window.naver.maps.LatLng(
                parseFloat(y),
                parseFloat(x),
              ),
              map: mapInstance,
            });

            const infoWindowContent = `
            <div style="width:400px; text-align:center; padding:10px; border-radius:10px; background-color: white; box-shadow: 0px 0px 5px rgba(0,0,0,0.3); position: relative;">
              <button id="close-btn" style="position: absolute; top: 5px; right: 5px; background: red; color: white; border: none; border-radius: 50%; width: 20px; height: 20px; cursor: pointer;">X</button>
              <h3 style="margin: 10px 0 10px; font-size: 20px; font-weight: bold;">${marker.title}</h3>
              <p style="margin-bottom: 10px; font-size: 16px; color: #555;">${marker.location}</p>
              <p style="margin-bottom: 0; font-size: 14px; color: #777;">${marker.address}</p>
            </div>
            `;

            const infoWindow = new window.naver.maps.InfoWindow({
              content: infoWindowContent,
            });

            window.naver.maps.Event.addListener(markerInstance, 'click', () => {
              infoWindow.open(mapInstance, markerInstance);

              setTimeout(() => {
                const closeBtn = document.getElementById('close-btn');
                if (closeBtn) {
                  closeBtn.addEventListener('click', () => {
                    infoWindow.close();
                  });
                }
              }, 100);
            });
          }
        },
      );
    });
  }, [naverMapLoaded, isLoading, markers, error]);

  // 사용자의 현재 위치 지속적으로 추적 및 마커 업데이트
  useEffect(() => {
    if (!map || !currentPositionMarker) return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newPosition = new window.naver.maps.LatLng(latitude, longitude);

        currentPositionMarker.setPosition(newPosition);
        map.setCenter(newPosition);
      },
      (error) => {
        console.error('Error watching position:', error);
      },
      { enableHighAccuracy: true },
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [map, currentPositionMarker]);

  return (
    <div className='relative h-full w-full'>
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}&submodules=geocoder`}
        onLoad={() => setNaverMapLoaded(true)}
        strategy='lazyOnload'
      />
      {isLoading ? (
        <div className='flex h-full w-full items-center justify-center text-lg font-semibold'>
          Loading map...
        </div>
      ) : error ? (
        <div className='flex h-full w-full items-center justify-center text-red-500'>
          Error loading markers: {error.message}
        </div>
      ) : (
        <div id='map' className='h-full w-full' />
      )}
    </div>
  );
}
