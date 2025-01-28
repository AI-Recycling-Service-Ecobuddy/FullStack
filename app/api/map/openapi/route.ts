import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    // 수성구 데이터 가져오기
    const suseongGuResponse = await axios.get(
      'https://api.odcloud.kr/api/15127636/v1/uddi:b8d629cb-49a1-4dc7-aec8-924057cb0738',
      {
        headers: {
          Authorization: `Infuser ${process.env.OPEN_API_DECODE_KEY}`,
        },
      },
    );

    // 중구 데이터 가져오기
    const jungGuResponse = await axios.get(
      'https://api.odcloud.kr/api/15086885/v1/uddi:37782167-d720-4858-af83-aa92600d370f',
      {
        headers: {
          Authorization: `Infuser ${process.env.OPEN_API_DECODE_KEY}`,
        },
      },
    );

    // 서구 데이터 가져오기
    const seoGuResponse = await axios.get(
      'https://api.odcloud.kr/api/15041577/v1/uddi:cb541318-d90b-4bb3-be27-db9c32fa47ec',
      {
        headers: {
          Authorization: `Infuser ${process.env.OPEN_API_DECODE_KEY}`,
        },
      },
    );

    // 데이터를 병합하여 마커 형식으로 변환
    const suseongGuMarkers = suseongGuResponse.data.data.map((item: any) => ({
      address: `대구광역시 ${item['도로명 주소']}`,
      location: item['행정동'],
      title: '수성구 쓰레기통',
    }));

    const jungGuMarkers = jungGuResponse.data.data.map((item: any) => ({
      address: item['주소'],
      location: item['위 치'],
      title: '중구 쓰레기통',
    }));

    const seoGuMarkers = seoGuResponse.data.data.map((item: any) => ({
      address: item['설치위치'],
      location: item['설치지점'],
      title: '서구 쓰레기통',
    }));

    const markers = [...suseongGuMarkers, ...jungGuMarkers, ...seoGuMarkers];

    return NextResponse.json(markers);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 },
    );
  }
}
