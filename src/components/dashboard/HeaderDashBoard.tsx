"use client";
import { Button, Heading } from "@radix-ui/themes";

import { useRouter } from "next/navigation";
import React from "react";

const HeaderDashBoard = () => {
  const router = useRouter();
  return (
    <div className="flex justify-between">
      <Heading>Projects</Heading>
      <Button onClick={() => router.push("/dashboard/projects/new")}>
        Add Project
      </Button>
    </div>
  );
};

export default HeaderDashBoard;
