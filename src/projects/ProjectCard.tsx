"use client";

import { Project } from "@prisma/client";
import { Card, Heading, Text } from "@radix-ui/themes";
import React from "react";
import { useRouter } from "next/navigation";

interface Props {
  project: Project;
}

const ProjectCard = ({ project }: Props) => {
  const router = useRouter();
  return (
    <Card onClick={() => router.push(`/dashboard/projects/${project.id}`)}>
      <Heading>{project.title}</Heading>
      <Text className="text-slate-500">{project.description}</Text>
    </Card>
  );
};

export default ProjectCard;
