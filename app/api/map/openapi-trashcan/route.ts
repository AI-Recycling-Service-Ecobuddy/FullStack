import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const apiEndpoints = [
      {
        url: 'https://api.odcloud.kr/api/15127636/v1/uddi:b8d629cb-49a1-4dc7-aec8-924057cb0738',
        title: '수성구 쓰레기통',
        mapping: (item: any) => ({
          address: `대구광역시 ${item['도로명 주소']}`,
          location: item['행정동'],
          title: '수성구 쓰레기통',
        }),
      },
      {
        url: 'https://api.odcloud.kr/api/15086885/v1/uddi:37782167-d720-4858-af83-aa92600d370f',
        title: '중구 쓰레기통',
        mapping: (item: any) => ({
          address: item['주소'],
          location: item['위 치'],
          title: '중구 쓰레기통',
        }),
      },
      {
        url: 'https://api.odcloud.kr/api/15041577/v1/uddi:cb541318-d90b-4bb3-be27-db9c32fa47ec',
        title: '서구 쓰레기통',
        mapping: (item: any) => ({
          address: item['설치위치'],
          location: item['설치지점'],
          title: '서구 쓰레기통',
        }),
      },
      {
        url: 'https://api.odcloud.kr/api/15127640/v1/uddi:e0324be9-0563-4f52-8547-e7057feb5010',
        title: '동구 쓰레기통',
        mapping: (item: any) => ({
          address: item['설치위치 지번주소'],
          location: item['위치명'],
          title: '동구 쓰레기통',
        }),
      },
      {
        url: 'https://api.odcloud.kr/api/15086945/v1/uddi:ad8e61a7-bf05-43fd-9091-c2ed8a32e8e1',
        title: '남구 쓰레기통',
        mapping: (item: any) => ({
          address: `대구광역시 남구 ${item['설치위치']}`,
          location: item['설치위치'],
          title: '남구 쓰레기통',
        }),
      },
      {
        url: 'https://api.odcloud.kr/api/15127543/v1/uddi:eef5a58d-68ed-4453-a217-dcea4fe2cb6d',
        title: '달서구 쓰레기통',
        mapping: (item: any) => ({
          address: `대구광역시 달서구 ${item['설치위치(도로명주소)']}`,
          location: item['세부위치'],
          title: '달서구 쓰레기통',
        }),
      },
    ];

    // 병렬 데이터 처리
    const responses = await Promise.all(
      apiEndpoints.map((endpoint) =>
        axios
          .get(endpoint.url, {
            headers: {
              Authorization: `Infuser ${process.env.OPEN_API_DECODE_KEY}`,
            },
          })
          .then((response) => ({
            data: response.data.data.map(endpoint.mapping),
          })),
      ),
    );

    // 모든 마커 병합
    const markers = responses.flatMap((response) => response.data);

    return NextResponse.json(markers);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 },
    );
  }
}
