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
import React from "react";
import { useForm, Controller } from "react-hook-form";

const TaskNewPage = () => {
  const { control, handleSubmit } = useForm({
    values: {
      title: "",
      description: "",
    },
  });
  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
  });
  return (
    <Container size={"1"} height={"100%"} className="p-3 md:p-0">
      <Flex className=" h-screen w-full items-center">
        <Card className="w-full p-7">
          <Heading mb={"6"}>New project</Heading>
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
            <Button>Create Project</Button>
          </form>
        </Card>
      </Flex>
    </Container>
  );
};

export default TaskNewPage;
