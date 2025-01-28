'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { getTrashCanInfo } from '../api/getTrashCanInfo';

interface Marker {
  address: string;
  location: string;
  title: string;
}

export default function NaverMap() {
  const [naverMapLoaded, setNaverMapLoaded] = useState(false);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [currentPosition, setCurrentPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [map, setMap] = useState<any>(null);
  const [currentPositionMarker, setCurrentPositionMarker] = useState<any>(null);

  useEffect(() => {
    // 사용자의 현재 위치를 추적
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newPosition = { lat: latitude, lng: longitude };
        setCurrentPosition(newPosition);

        if (map && currentPositionMarker) {
          const newLatLng = new window.naver.maps.LatLng(
            newPosition.lat,
            newPosition.lng,
          );
          currentPositionMarker.setPosition(newLatLng);
          map.setCenter(newLatLng); // 지도 중심 업데이트
        }
      },
      (error) => {
        console.error('Error watching position:', error);
        // 기본 위치: 서울 시청
        setCurrentPosition({ lat: 37.5665, lng: 126.978 });
      },
      { enableHighAccuracy: true },
    );

    return () => {
      navigator.geolocation.clearWatch(watchId); // 위치 추적 해제
    };
  }, [map, currentPositionMarker]);

  useEffect(() => {
    const getMarkerInfo = async () => {
      try {
        const res = await getTrashCanInfo();
        const formattedMarkers = res.map((item: any) => ({
          address: item.address,
          location: item.location,
          title: item.title,
        }));
        setMarkers(formattedMarkers);
      } catch (error) {
        console.error('Error fetching marker info:', error);
      }
    };
    getMarkerInfo();
  }, []);

  useEffect(() => {
    if (naverMapLoaded && window.naver) {
      const mapOptions = {
        center: new window.naver.maps.LatLng(37.5665, 126.978), // 기본 중심 위치 (서울)
        zoom: 12,
      };

      const mapInstance = new window.naver.maps.Map('map', mapOptions);
      setMap(mapInstance);

      const positionMarker = new window.naver.maps.Marker({
        map: mapInstance,
        position: new window.naver.maps.LatLng(37.5665, 126.978),
        icon: {
          url: '/map/current-location.webp',
          size: new window.naver.maps.Size(36, 36),
          scaledSize: new window.naver.maps.Size(36, 36),
          anchor: new window.naver.maps.Point(18, 18),
        },
      });
      setCurrentPositionMarker(positionMarker);

      markers.forEach((marker) => {
        window.naver.maps.Service.geocode(
          { query: marker.address },
          (status, response) => {
            if (status === window.naver.maps.Service.Status.ERROR) {
              console.error('Geocoding Error:', marker.address);
              return;
            }

            if (response.v2.addresses.length > 0) {
              const { x, y } = response.v2.addresses[0]; // x: 경도, y: 위도

              const markerInstance = new window.naver.maps.Marker({
                position: new window.naver.maps.LatLng(
                  parseFloat(y),
                  parseFloat(x),
                ),
                map: mapInstance,
                icon: {
                  url: '/map/marker.webp',
                  size: new window.naver.maps.Size(48, 48),
                  scaledSize: new window.naver.maps.Size(48, 48),
                  anchor: new window.naver.maps.Point(24, 48),
                },
              });

              const infoWindowContent = `
                <div style="width:400px; text-align:center; padding:10px; border-radius:10px; background-color: white; box-shadow: 0px 0px 5px rgba(0,0,0,0.3);">
                  <h3 style="margin: 0 0 10px; font-size: 20px; font-weight: bold;">${marker.location}</h3>
                  <p style="margin-bottom: 10px; font-size: 16px; color: #555;">${marker.address}</p>
                </div>
              `;

              const infoWindow = new window.naver.maps.InfoWindow({
                content: infoWindowContent,
              });

              window.naver.maps.Event.addListener(
                markerInstance,
                'click',
                () => {
                  infoWindow.open(mapInstance, markerInstance);
                },
              );
            }
          },
        );
      });
    }
  }, [naverMapLoaded, markers]);

  return (
    <div className='relative h-full w-full'>
      {/* 네이버 지도 스크립트 로드 */}
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}&submodules=geocoder`}
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
