"use client";
import { Button, Container, Heading } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  return (
    <Container className="mt-10">
      <div className="flex justify-between">
        <Heading>Tasks</Heading>
        <Button onClick={() => router.push("/dashboard/tasks/new")}>
          Add tasks
        </Button>
      </div>
    </Container>
  );
};

export default page;
