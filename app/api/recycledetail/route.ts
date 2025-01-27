import RecycleDetailModel from '@/src/features/recycle/model/recycleDetailModel';
import { connectMongoDB } from '@/src/shared/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();

    // URL에서 'type' 파라미터를 가져와 디코딩
    const url = new URL(req.url);
    const typeParam = url.searchParams.get('type');
    const type = typeParam ? decodeURIComponent(typeParam).trim() : null;

    if (type) {
      const recycledetail = await RecycleDetailModel.find({ type: type });
      return NextResponse.json(recycledetail, { status: 200 });
    }

    const recycledetail = await RecycleDetailModel.find({});
    return NextResponse.json(recycledetail, { status: 200 });
  } catch (error) {
    console.error('Error fetching recycle detail data:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching recycle detail data' },
      { status: 500 },
    );
  }
}
