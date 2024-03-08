import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import type { AuthOptions, RequestInternal } from "next-auth";
import prisma from "./libs/prisma";

interface Credentials {
  email?: string;
  username?: string;
  password: string; // Required password property
}

interface User {
  id: string; // Ensure id is a string
  name: string;
  email: string;
}

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Credentials | undefined,

        request: Pick<RequestInternal, "body" | "query" | "headers" | "method">
      ) {
        if (!credentials) {
          throw new Error("Missing credentials"); // Or handle it appropriately
        }
        const { email, password } = credentials;
        const userFound = await prisma.user.findUnique({
          where: { email: email },
        });

        if (!userFound) throw new Error("Invalid credentials");
        const validatePw = await bcrypt.compare(password, userFound.password);
        if (!validatePw) throw new Error("Invalid credentials");
        const userSend: User = {
          id: userFound.id.toString(),
          name: userFound.name,
          email: userFound.email,
        };
        return userSend;
        // return {
        //   id: userFound.id,
        //   name: userFound.name,
        //   email: userFound.email,
        // };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, user, token }) {
      if (token) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};
