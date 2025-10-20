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

function SignupPage() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, Signing } = NoteFunctions();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await signup(data);
    if (success) {
      toast({
        title: "Signup",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Signup",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box minW={"100vw"} minH={"100vh"}>
      <Container p={"6"}>
        <Flex justifyContent="flex-end" mb={4}>
          <Button colorScheme="cyan" onClick={toggleColorMode}>
            {colorMode === "light" ? <SunIcon /> : <MoonIcon />}
          </Button>
        </Flex>

        <Heading as="h4" marginY={"6"} size="md">
          fullName:
        </Heading>
        <Input
          type="text"
          value={data.fullName}
          onChange={(e) => setData({ ...data, fullName: e.target.value })}
          placeholder="fullName..."
          size="md"
        />

        <Heading as="h4" marginY={"6"} size="md">
          Email
        </Heading>
        <Input
          type="text"
          placeholder="Email..."
          size="md"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <Heading marginY={"6"} as="h4" size="md">
          Password
        </Heading>

        <Input
          type="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          placeholder="Password..."
          size="md"
        />
        <Button
          disabled={Signing}
          w={"full"}
          onClick={handleSubmit}
          marginY={"6"}
          colorScheme="blue"
        >
          {Signing ? "Signing In..." : "SignUp"}
        </Button>
        <Link to={"/login"}>
          <Button w={"full"} colorScheme="teal" variant="outline">
            Already User Then Login
          </Button>
        </Link>
      </Container>
    </Box>
  );
}

export default SignupPage;
