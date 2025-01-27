'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { Message } from 'ai';
import { useChat } from 'ai/react';

export default function Chat() {
  const { data: session } = useSession();
  const [error, setError] = useState<string | null>(null);
  const [chatId, setChatId] = useState<string | null>(null);
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/openai',
    initialMessages,
    onFinish: async (message) => {
      if (session?.user?.id) {
        try {
          console.log('Saving message:', { chatId, message });

          await axios.post('/api/chat', {
            chatId,
            message: {
              id: message.id,
              content: message.content,
              role: message.role,
              createdAt: new Date(),
            },
          });
        } catch (err) {
          if (axios.isAxiosError(err)) {
            console.error('Failed to save message:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Failed to save message');
          }
        }
      }
    },
    onError: (err: Error) => {
      console.error('Chat error:', err);
      if (err.message.includes('usage limit')) {
        setError('API usage limit reached. Please try again later or contact support.');
      } else {
        setError('An error occurred while sending the message. Please try again.');
      }
    },
  });

  const chatContainer = useRef<HTMLDivElement>(null);

  // 채팅 로드
  useEffect(() => {
    const loadChat = async () => {
      if (session?.user?.id) {
        try {
          const { data } = await axios.get('/api/chat');
          console.log('Loaded chat data:', data);
          setChatId(data._id);
          if (data.messages && data.messages.length > 0) {
            const formattedMessages = data.messages.map((msg: Message) => ({
              ...msg,
              id: msg.id || Math.random().toString(36).substr(2, 9),
              createdAt: msg.createdAt || new Date(),
            }));
            console.log('Setting initial messages:', formattedMessages);
            setInitialMessages(formattedMessages);
          }
        } catch (err) {
          if (axios.isAxiosError(err)) {
            console.error('Failed to load chat:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Failed to load chat history');
          }
        }
      }
    };

    loadChat();
  }, [session]);

  const scroll = () => {
    const { offsetHeight, scrollHeight, scrollTop } = chatContainer.current as HTMLDivElement;
    if (scrollHeight > scrollTop + offsetHeight) {
      chatContainer.current?.scrollTo(0, scrollHeight + 200);
    }
  };

  useEffect(() => {
    scroll();
  }, [messages]);

  const renderResponse = () => {
    return (
      <div>
        {messages.map((m, idx) => (
          <div key={idx} className='flex items-start mb-4'>
            <Image
              width={50}
              height={50}
              alt='avatar'
              src={m.role === 'user' ? '/chatbot/UserAvatar.webp' : '/chatbot/AiAvatar.webp'}
              className='w-[50px] h-[50px] rounded-full mr-4'
            />
            <div className='flex-grow'>
              <p className='mb-2 whitespace-pre-wrap'>{m.content}</p>
              {idx < messages.length - 1 && <hr className='my-2' />}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <main ref={chatContainer} className='w-full flex flex-col items-center'>
      <section className='flex-grow overflow-y-auto px-[30px] lg:px-[100px] pb-[30px]'>
        {renderResponse()}
        {error && <div className='text-red-500 mb-4 p-2 bg-red-100 rounded'>{error}</div>}
      </section>
      <div className='w-full h-[100px]' />
      <section className='fixed bottom-0 left-0 right-0 p-4 shadow-md flex justify-center bg-neutral-800 bg-opacity-20'>
        <form onSubmit={handleSubmit} className='w-[800px] bg-white border flex rounded-2xl justify-between'>
          <textarea
            name='input-field'
            value={input}
            onChange={handleInputChange}
            placeholder='Say anything'
            className='text-black flex-grow pl-[20px] outline-none rounded-3xl pt-[5px] resize-none'
          />
          <button type='submit' className='w-[50px] text-white bg-black rounded-full'>
            Send
          </button>
        </form>
      </section>
    </main>
  );
}
