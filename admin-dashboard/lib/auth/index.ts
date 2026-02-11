import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // For development - bypass database and use hardcoded credentials
        console.log('Auth attempt:', {
          email: credentials?.email,
          password: credentials?.password,
        });

        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password?.trim();

        if (
          email === 'admin@blueprxnt.com' &&
          password === 'blueprxnt2024'
        ) {
          console.log('Auth success!');
          return {
            id: '1',
            email: 'admin@blueprxnt.com',
            name: 'Admin User',
            role: 'admin',
          };
        }

        console.log('Auth failed - invalid credentials');
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};
