import prisma from "@/libs/prisma";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string>,
        request
      ) {
        const { email, password } = credentials;
        const userFound = await prisma.user.findUnique({
          where: { email: email },
        });
        if (!userFound) throw new Error("Invalid credentials");
        const validatePw = await bcrypt.compare(password, userFound.password);
        if (!validatePw) throw new Error("Invalid credentials");
        return {
          id: userFound.id,
          name: userFound.name,
          email: userFound.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
});

export { handler as GET, handler as POST };
