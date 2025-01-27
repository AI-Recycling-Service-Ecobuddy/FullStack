import { redirect } from 'next/navigation';
import { auth } from '../auth';
import Chat from '../../src/features/chatbot/ui/Chat';

export default async function ChatBotPage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <main className='w-full min-h-screen bg-gray-900 text-white flex flex-col items-center'>
      <div className='text-[28px] font-bold p-[80px]'>Talk to AI Bot</div>
      <Chat />
    </main>
  );
}
