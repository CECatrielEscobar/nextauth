import HeaderDashBoard from "@/components/dashboard/HeaderDashBoard";
import { Container, Grid } from "@radix-ui/themes";
import prisma from "@/libs/prisma";
import { getServerSession } from "next-auth/next";
// import { authOptions } from "../api/auth/[...nextauth]/route";
import ProjectCard from "@/projects/ProjectCard";
import { authOptions } from "@/authConfig";

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
    <Container className="mt-10 px-5 xl:px-0">
      <HeaderDashBoard />
      {projects.length === 0 ? (
        <h1 className="text-2xl mt-8 text-slate-500">
          No hay proyectos creados...
        </h1>
      ) : (
        <div className="grid md:grid-cols-3 gap-5 mt-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default page;
