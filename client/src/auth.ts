import NextAuth from "next-auth";
import AuthHandler from "./lib/authHandler";

const handler = new AuthHandler();
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    handler.login(),
    handler.signup(),
  ],
  callbacks: {
    async jwt({ token, user: user }) {
      if (user) token.accessToken = user.accessToken
      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken as string | undefined;
      return session;
    },
  }
})