import { connectMongoDB } from '@/src/shared/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import Marker from '@/src/features/map/model/marker';

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();

    const markers = await Marker.find({});

    return NextResponse.json(markers, { status: 200 });
  } catch (error) {
    console.error('Error fetching recycle detail data:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching recycle detail data' },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { address, location, title, imgUrl } = await req.json();

    await connectMongoDB();
    await Marker.create({ address, location, title, imgUrl });

    return NextResponse.json(
      { message: 'New marker is created.' },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'An error occured while Post for Board.' },
      { status: 500 },
    );
  }
}
