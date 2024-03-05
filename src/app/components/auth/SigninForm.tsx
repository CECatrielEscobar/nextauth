"use client";
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { Button, Flex, Text, TextField } from "@radix-ui/themes";
import { error } from "console";
import { useForm, Controller } from "react-hook-form";

const SigninForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    values: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <form onSubmit={onSubmit}>
      <Flex direction={"column"} gap={"2"}>
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
        <Button type="submit" mt={"4"}>
          Sign In
        </Button>
      </Flex>
    </form>
  );
};

export default SigninForm;
