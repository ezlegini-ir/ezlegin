import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { database } from "@ezlegin/database";
import authConfig from "./auth.config";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(database),
  session: { strategy: "jwt" },
  ...authConfig,
  providers: [Google],
});
