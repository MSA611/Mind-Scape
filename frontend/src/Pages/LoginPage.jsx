import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import NoteFunctions from "../zustand";

function LoginPage() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  const { login, loggingIn } = NoteFunctions();

  const handleForm = async (e) => {
    e.preventDefault();
    const { success, message } = await login(data);
    if (success) {
      toast({
        title: "Login",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Login",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box minW={"100vw"} marginY={"100"} minH={"100dvh"}>
      <Container
        borderWidth="1px"
        borderRadius="lg"
        borderColor="green.500"
        p={"6"}
      >
        <Flex justifyContent="flex-end" mb={4}>
          <Button colorScheme="cyan" onClick={toggleColorMode}>
            {colorMode === "light" ? <SunIcon /> : <MoonIcon />}
          </Button>
        </Flex>

        <Heading as="h4" marginY={"6"} size="md">
          Email
        </Heading>
        <Input
          type="text"
          placeholder="Email..."
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          size="md"
        />

        <Heading marginY={"6"} as="h4" size="md">
          Password
        </Heading>
        <Input
          type="password"
          placeholder="Password..."
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          size="md"
        />
        <Button
          disabled={loggingIn}
          w={"full"}
          marginY={"6"}
          colorScheme="blue"
          onClick={handleForm}
        >
          {loggingIn ? "Logging In ..." : "Login"}
        </Button>
        <Link to={"/signup"}>
          <Button w={"full"} colorScheme="teal" variant="outline">
            New To This Website Signup
          </Button>
        </Link>
      </Container>
    </Box>
  );
}

export default LoginPage;
