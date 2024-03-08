"use client";
import {
  Button,
  Card,
  Container,
  Flex,
  Heading,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { TrashIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
const TaskNewPage = () => {
  const router = useRouter();
  const params = useParams() as { projectId: string };
  const { control, handleSubmit, setValue } = useForm({
    values: {
      title: "",
      description: "",
    },
  });
  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    if (!params.projectId) {
      const res = await axios.post("/api/projects", data);
      if (res.status === 200) {
        router.push("/dashboard");
        router.refresh();
      }
    } else {
      const res = await axios.put(`/api/projects/${params.projectId}`, data);
      console.log(res);
      if (res.status === 200) {
        router.push("/dashboard");
        router.refresh();
      }
    }
  });
  const handleDelete = async (projectId: string) => {
    console.log(projectId);
    const res = await axios.delete(`/api/projects/${projectId}`);
    if (res.status === 200) {
      toast.success("Project deleted succesfully");
    }
    router.push("/dashboard");
    router.refresh();
  };

  useEffect(() => {
    if (params.projectId) {
      axios.get(`/api/projects/${params.projectId}`).then((res) => {
        console.log(res.data);
        setValue("title", res.data.title);
        setValue("description", res.data.description);
      });
    }
  });
  return (
    <Container size={"1"} height={"100%"} className="p-3 md:p-0">
      <Flex className=" h-screen w-full items-center">
        <Card className="w-full p-7">
          <Heading mb={"6"}>
            {params.projectId ? "Edit Project" : "New Project"}
          </Heading>
          <form className="flex flex-col gap-y-4" onSubmit={onSubmit}>
            <label htmlFor="title">Project title</label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => {
                return (
                  <TextField.Input
                    size={"3"}
                    placeholder="Project title..."
                    {...field}
                  />
                );
              }}
            />
            <label htmlFor="description">Description</label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => {
                return (
                  <TextArea size={"3"} placeholder="Description" {...field} />
                );
              }}
            />
            <Button>
              {params.projectId ? "Edit Project" : "Create Project"}
            </Button>
          </form>
          <div className="flex justify-end my-4">
            {params.projectId && (
              <Button
                color="red"
                onClick={() => handleDelete(params.projectId)}
              >
                <TrashIcon />
                Delete Project
              </Button>
            )}
          </div>
        </Card>
      </Flex>
    </Container>
  );
};

export default TaskNewPage;
