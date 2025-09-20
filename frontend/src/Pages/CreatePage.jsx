import {
  Box,
  Button,
  HStack,
  Input,
  Textarea,
  useColorMode,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import NoteFunctions from "../zustand";

const CreatePage = () => {
  const nav = useNavigate();
  const [resize, setResize] = useState("horizontal");
  const [data, setData] = useState({
    name: "",
    content: "",
  });
  const { colorMode, toggleColorMode } = useColorMode();
  const { createNote } = NoteFunctions();
  const toast = useToast();

  const handleInput = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
    setData({ ...data, content: e.target.value });
  };

  const post = async () => {
    const { success, message } = await createNote(data);
    if (success) {
      toast({
        description: message,
        duration: 1000,
        status: "success",
      });
      nav("/");
    } else {
      toast({
        description: message,
        duration: 1000,
        status: "error",
      });
    }
  };

  return (
    <Box p={"12"}>
      <HStack>
        <Link to="/">
          <Button mb={"3.5"} colorScheme="blue">
            Back
          </Button>
        </Link>

        <Button onClick={toggleColorMode} mb={"3.5"} colorScheme="blue">
          {colorMode === "light" ? "D" : "L"}
        </Button>
      </HStack>
      <VStack>
        <Input
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          placeholder="Enter Title..."
          size="lg"
        />

        <Textarea
          value={data.content}
          onInput={handleInput}
          placeholder="Enter Content..."
          size="lg"
          resize={resize}
        />
        <Button onClick={post} w={"full"} colorScheme="blue">
          Create Now
        </Button>
      </VStack>
    </Box>
  );
};

export default CreatePage;
