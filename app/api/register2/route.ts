import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import client from '@/src/shared/lib/authMongodb';

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { message: '모든 필드를 입력해야 합니다.' },
      { status: 400 },
    );
  }

  const db = client.db();
  const existingUser = await db.collection('users').findOne({ email });

  if (existingUser) {
    return NextResponse.json(
      { message: '이미 등록된 이메일입니다.' },
      { status: 400 },
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await db
    .collection('users')
    .insertOne({ name, email, password: hashedPassword });

  return NextResponse.json(
    { message: '회원가입이 완료되었습니다.' },
    { status: 201 },
  );
}
