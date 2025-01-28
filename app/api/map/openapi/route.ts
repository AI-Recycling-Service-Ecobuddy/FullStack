import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const res = await axios.get(
      'https://api.odcloud.kr/api/15127636/v1/uddi:b8d629cb-49a1-4dc7-aec8-924057cb0738',
      {
        headers: {
          Authorization:
            'Infuser b6x0DxC2SjTFTFaQBXbUH7xTPTlw+Lfhil1mSnq8zR3rgSnqFnUdoBQd4MKygy+Eeb87GcaCzIsS3hTkJnY1kw==',
        },
      },
    );

    const markers = res.data.data.map((item: any) => ({
      address: `대구광역시 ${item['도로명 주소']}`,
      location: item['행정동'],
      title: '수성구 쓰레기통',
    }));

    return NextResponse.json(markers);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 },
    );
  }
}
