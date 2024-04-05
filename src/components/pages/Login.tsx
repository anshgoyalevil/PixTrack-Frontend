import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  LoadingOverlay,
  Box,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { login } from "../../slices/auth";
import { clearMessage } from "../../slices/message";
import { useForm } from "@mantine/form";

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state: any) => state.auth);
  const [loadingOverlayIsVisible, setLoadingOverlayIsVisible] = useState(false);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  });

  const handleLogin = async (formValue: any) => {
    setLoadingOverlayIsVisible(true);
    const { username, password } = formValue;
    //@ts-ignore
    await dispatch(login({ username, password }))
      .unwrap()
      .then(async () => {
        setLoadingOverlayIsVisible(false);
        navigate("/pixels");
        window.location.reload();
      })
      .catch((error: any) => {
        setLoadingOverlayIsVisible(false);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/pixels" />;
  }

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor size="sm" component={Link} to="/register">
          Create account
        </Anchor>
      </Text>

      <Box maw={400} pos="relative">
        <LoadingOverlay
          loaderProps={{ variant: "bars" }}
          visible={loadingOverlayIsVisible}
          overlayBlur={1}
        />
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit(handleLogin)}>
            <TextInput
              label="Username"
              placeholder="johndoe123"
              required
              {...form.getInputProps("username")}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              mt="md"
              {...form.getInputProps("password")}
            />
            <Group position="apart" mt="lg">
              <Checkbox label="Remember me" />
              <Anchor component={Link} to="/forgot-password" size="sm">
                Forgot password?
              </Anchor>
            </Group>
            <Button fullWidth mt="xl" type="submit">
              Sign in
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}
