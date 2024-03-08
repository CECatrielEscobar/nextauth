import { Container } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth/next";
// import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { authOptions } from "@/authConfig";
const Home = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect("/dashboard");
  }
  return (
    <Container className="px-5 xl:px-0">
      <header className="my-4 bg-slate-800 p-10 rounded-md">
        <h1 className="text-7xl my-10">NextAuth | Radix</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum alias
          harum excepturi, ab, quidem labore maiores minima recusandae tempore,
          voluptates ex explicabo temporibus unde est atque! Aut tempora maiores
          consequuntur!
        </p>
        <div className="mt-10">
          <Link
            href={"/auth/login"}
            className="text-2xl text-white bg-blue-500 px-2.5 py-1 rounded-md mt-20"
          >
            Login
          </Link>
        </div>
      </header>
    </Container>
  );
};

export default Home;
