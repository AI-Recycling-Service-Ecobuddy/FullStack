import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/src/app/providers/AuthProvider';
import Nav from '@/src/widgets/navbar/ui/Nav';

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
          <main className='mt-[70px]'>
            <Nav />
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
