import HeaderDashBoard from "@/components/dashboard/HeaderDashBoard";
import { Container, Grid } from "@radix-ui/themes";
import prisma from "@/libs/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ProjectCard from "@/projects/ProjectCard";

async function loadProjects() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) return [];
  return await prisma.project.findMany({
    where: {
      userId: parseInt(session?.user?.id),
    },
  });
}

const page = async () => {
  const projects = await loadProjects();
  return (
    <Container className="mt-10">
      <HeaderDashBoard />
      {projects.length === 0 ? (
        <h1 className="text-2xl mt-8 text-slate-500">
          No hay proyectos creados...
        </h1>
      ) : (
        <Grid columns={"3"} mt={"8"} gap={"4"}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default page;
