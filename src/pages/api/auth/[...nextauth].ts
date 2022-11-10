import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';

import { authController } from '../../../controllers';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: {
          label: 'Correo',
          type: 'email',
          placeholder: 'email@email.com',
        },
        password: {
          label: 'Contraseña',
          type: 'password',
          placeholder: 'Password',
        },
      },
      async authorize(credentials) {
        return await authController.checkUserEmailPassword(
          credentials!.email,
          credentials!.password
        );
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: '/signin',
    newUser: '/signup',
  },
  session: {
    maxAge: 2592000,
    strategy: 'jwt',
    updateAge: 86400,
  },
  callbacks: {
    async jwt({ token, account, user, ...props }) {
      console.log({ props });
      console.log({ account });
      console.log({ user });
      console.log({ token });
      if (account) {
        token.accessToken = account.access_token;

        switch (account.type) {
          case 'oauth':
            token.user = await authController.oAuthToDbUser(
              user?.email || '',
              user?.name || ''
            );
            break;

          case 'credentials':
            token.user = user;
            break;
        }
      }

      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      session.user = token.user as any;
      console.log({ session, token, user });
      return session;
    },
  },
});
