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
import NoteFunctions from "../zustand";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ArrowBackIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

const NoteDetails = () => {
  const [resize, setResize] = useState("horizontal");
  const { colorMode, toggleColorMode } = useColorMode();
  const { UpdateNote, getNote, note } = NoteFunctions();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();
  const nav = useNavigate();

  const toast = useToast();

  const handleInput = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
    setContent(e.target.value);
  };

  const put = async () => {
    const { success, message } = await UpdateNote(`${id}`, { title, content });
    if (success) {
      toast({
        description: message,
        duration: 3000,
        status: "success",
      });
      nav("/");
    } else {
      toast({
        description: message,
        duration: 3000,
        status: "error",
      });
    }
  };

  useEffect(() => {
    const fetchDataId = async () => {
      const { success, message, data } = await getNote(id);
      if (success) {
        setTitle(data.title || "");
        setContent(data.content || "");
      } else {
        toast({
          description: message,
          duration: 3000,
          status: "error",
        });
      }
    };
    fetchDataId();
  }, []);

  return (
    <Box p={"12"}>
      <HStack>
        <Link to="/">
          <Button mb={"3.5"} gap={2} colorScheme="blue">
            <ArrowBackIcon />
            Back
          </Button>
        </Link>

        <Button onClick={toggleColorMode} mb={"3.5"} colorScheme="blue">
          {colorMode === "light" ? <SunIcon /> : <MoonIcon />}
        </Button>
      </HStack>
      <VStack>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Title..."
          size={"lg"}
        />

        <Textarea
          value={content}
          onInput={handleInput}
          placeholder="Enter Content..."
          minHeight="500px"
          size="lg"
          resize={resize}
        />
        <Button w={"full"} onClick={put} colorScheme="blue">
          UpdateNow
        </Button>
      </VStack>
    </Box>
  );
};

export default NoteDetails;
