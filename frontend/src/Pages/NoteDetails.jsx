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
import Loading from "../Components/Loading";

const NoteDetails = () => {
  const [resize, setResize] = useState("horizontal");
  const { colorMode, toggleColorMode } = useColorMode();
  const { UpdateNote, getNote, note } = NoteFunctions();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [updateState, setUpdateState] = useState(false);
  const { id } = useParams();
  const nav = useNavigate();

  const toast = useToast();

  const handleInput = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
    setContent(e.target.value);
  };

  const put = async () => {
    setUpdateState(true);
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
    setUpdateState(false);
  };

  useEffect(() => {
    const fetchDataId = async () => {
      setLoading(true);
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
      setLoading(false);
    };
    fetchDataId();
  }, []);

  return (
    <Box position={"relative"} p={"12"}>
      {loading ? (
        <Loading />
      ) : (
        <>
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
            <Button
              disabled={updateState}
              w={"full"}
              onClick={put}
              colorScheme="blue"
            >
              {updateState ? "Updating..." : "UpdateNow"}
            </Button>
          </VStack>
        </>
      )}
    </Box>
  );
};

export default NoteDetails;
