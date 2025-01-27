import { connectMongoDB } from '@/src/shared/lib/mongodb';
import { Chat } from '@/src/features/chatbot/model/chat';
import { auth } from '@/app/auth';

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectMongoDB();

    let chat = await Chat.findOne({ userId: session.user.id }).sort({
      createdAt: -1,
    });

    if (!chat) {
      chat = await Chat.create({
        userId: session.user.id,
        messages: [],
      });
    }

    return Response.json(chat);
  } catch (error) {
    console.error('DB Error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectMongoDB();
    const body = await req.json();

    const { chatId, message } = body;

    // chatId가 없는 경우 새 채팅 생성
    if (!chatId) {
      const newChat = await Chat.create({
        userId: session.user.id,
        messages: [message],
      });
      return Response.json(newChat);
    }

    // 기존 채팅에 메시지 추가
    const chat = await Chat.findByIdAndUpdate(
      chatId,
      { $push: { messages: message } },
      { new: true },
    );

    if (!chat) {
      return Response.json({ error: 'Chat not found' }, { status: 404 });
    }

    return Response.json(chat);
  } catch (error) {
    console.error('DB Error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
