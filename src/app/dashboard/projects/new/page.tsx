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
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { TrashIcon } from "@radix-ui/react-icons";
const TaskNewPage = () => {
  const router = useRouter();
  const params = useParams();
  console.log(params);
  const { control, handleSubmit } = useForm({
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
              <Button color="red">
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
