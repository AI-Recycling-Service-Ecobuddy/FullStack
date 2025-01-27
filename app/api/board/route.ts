import { connectMongoDB } from '@/src/shared/lib/mongodb';
import Board from '@/src/entities/board/model/board';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (id) {
      const board2 = await Board.find({ id: id });
      return NextResponse.json(board2, { status: 200 });
    }

    const board = await Board.find({});

    return NextResponse.json(board, { status: 200 });
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
    const { id, writer, title, body, date } = await req.json();

    await connectMongoDB();
    await Board.create({ id, writer, title, body, date });

    return NextResponse.json({ message: 'Board registered.' }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'An error occured while Post for Board.' },
      { status: 500 },
    );
  }
}
