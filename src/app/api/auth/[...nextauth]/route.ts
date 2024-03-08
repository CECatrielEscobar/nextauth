import prisma from "@/libs/prisma";
import NextAuth from "next-auth/next";
import bcrypt from "bcrypt";
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authOptions } from "@/authConfig";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     Credentials({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text", placeholder: "jsmith" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(
//         credentials: Record<"email" | "password", string>,

//         request
//       ) {
//         const { email, password } = credentials;
//         const userFound = await prisma.user.findUnique({
//           where: { email: email },
//         });
//         if (!userFound) throw new Error("Invalid credentials");
//         const validatePw = await bcrypt.compare(password, userFound.password);
//         if (!validatePw) throw new Error("Invalid credentials");
//         return {
//           id: userFound.id,
//           name: userFound.name,
//           email: userFound.email,
//         };
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user, account, profile }) {
//       if (user) {
//         token.id = user.id;
//       }

//       return token;
//     },
//     async session({ session, user, token }) {
//       if (token) {
//         session.user.id = token.sub as string;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/auth/login",
//   },
// };
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
