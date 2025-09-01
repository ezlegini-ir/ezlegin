import Credentials from "next-auth/providers/credentials";
import { NextAuthConfig } from "next-auth";
import { getUserById, getUserByIdentifier } from "./data/user";
import Google from "next-auth/providers/google";

export default {
  pages: {
    signIn: "/login",
  },
  trustHost: true,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const existingUser = await getUserById(+user.id!);
        if (!existingUser) return token;
        token.id = user.id;
        return token;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
  providers: [
    Google,
    Credentials({
      id: "user-login",
      name: "User Login",
      credentials: {
        identifier: {},
      },
      authorize: async (credentials) => {
        const { identifier } = credentials as {
          identifier: string;
        };

        if (!identifier) {
          throw new Error("لطفا اطلاعات را وارد کنید.");
        }

        const user = await getUserByIdentifier(identifier);
        if (!user) throw new Error("User Not Found");

        return { id: user.id.toString() };
      },
    }),
  ],
} satisfies NextAuthConfig;
