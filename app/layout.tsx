import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/src/app/providers/AuthProvider';
import { ChatBot } from '@/src/features/chatbot';
import Navbar from '@/src/widgets/navbar/ui/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '에디 재활용 지키미',
  description: 'Eco recycle AI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthProvider>
          <div className='pt-[70px]'>
            <Navbar />
            <ChatBot />
            <main className='h-[calc(100vh-70px)]'>{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
