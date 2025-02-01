import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import client from '@/src/shared/lib/authMongodb';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const db = client.db();
        const user = await db
          .collection('users')
          .findOne({ email: credentials.email });

        if (!user) throw new Error('존재하지 않는 이메일입니다.');

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );

        if (!isPasswordValid) throw new Error('비밀번호가 일치하지 않습니다.');

        return { id: user._id.toString(), email: user.email, name: user.name };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24, // 1일 동안 세션 유지 (사용자 활동이 있으면 세션 유지)
  },
  jwt: {
    maxAge: 60 * 60, // 1시간 (3600초) 동안 JWT 토큰 유지
  },
  pages: {
    signIn: '/login', // 커스텀 로그인 페이지
  },
});
