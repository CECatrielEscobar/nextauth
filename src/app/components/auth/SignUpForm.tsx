"use client";
import {
  EnvelopeClosedIcon,
  LockClosedIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import React from "react";
import { useForm, Controller } from "react-hook-form";
const SignUpForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = handleSubmit(async (data) => {
    const res = await axios.post("/api/auth/register", data);
    console.log(res);
  });
  return (
    <form onSubmit={onSubmit}>
      <Flex direction={"column"} gap={"2"}>
        <label htmlFor="name">Name</label>
        <TextField.Root>
          <TextField.Slot>
            <PersonIcon height={"16"} width={"16"} />
          </TextField.Slot>
          <Controller
            name="name"
            control={control}
            rules={{
              required: {
                message: "Name is required",
                value: true,
              },
              minLength: {
                message: "Name must be at least 6 characters long",
                value: 4,
              },
            }}
            render={({ field }) => {
              return (
                <TextField.Input
                  type="text"
                  placeholder="Write your name.."
                  {...field}
                />
              );
            }}
          />
        </TextField.Root>
        {errors.name && (
          <Text color="ruby" className="text-xs">
            {errors.name.message}
          </Text>
        )}
        <label htmlFor="email">Email</label>
        <TextField.Root>
          <TextField.Slot>
            <EnvelopeClosedIcon height={"16"} width={"16"} />
          </TextField.Slot>
          <Controller
            render={({ field }) => {
              return (
                <TextField.Input
                  type="email"
                  placeholder="email@email.com"
                  autoFocus
                  {...field}
                />
              );
            }}
            name={"email"}
            control={control}
            rules={{
              required: {
                message: "Email is required",
                value: true,
              },
            }}
          />
        </TextField.Root>
        {errors.email && (
          <Text color="ruby" className="text-xs">
            {errors.email.message}
          </Text>
        )}
        <label htmlFor="password">Password</label>
        <TextField.Root>
          <TextField.Slot>
            <LockClosedIcon height={"16"} width={"16"} />
          </TextField.Slot>
          <Controller
            render={({ field }) => {
              return (
                <TextField.Input
                  type="password"
                  placeholder="*****"
                  {...field}
                />
              );
            }}
            name={"password"}
            control={control}
            rules={{
              required: {
                message: "Password is required",
                value: true,
              },
              minLength: {
                message: "Password must be at least 6 characters",
                value: 6,
              },
            }}
          />
        </TextField.Root>
        {errors.password && (
          <Text color="ruby" className="text-xs">
            {errors.password.message}
          </Text>
        )}
        <Button>Sign Up</Button>
      </Flex>
    </form>
  );
};

export default SignUpForm;
