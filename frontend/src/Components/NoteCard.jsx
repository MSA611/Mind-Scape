import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  toastStore,
  useToast,
} from "@chakra-ui/react";
import NoteFunctions from "../zustand";

const NoteCard = ({ note }) => {
  const { DelNote } = NoteFunctions();
  const toast = useToast();

  const Delete = async (p_id) => {
    const { success, message } = await DelNote(p_id);
    if (success) {
      toast({
        description: message,
        duration: 1000,
        status: "success",
      });
    } else {
      toast({
        description: message,
        duration: 1000,
        status: "error",
      });
    }
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={"6"}
    >
      <Heading as="h5" size="sm">
        {note.title}
      </Heading>
      <Box whiteSpace="pre-wrap" mt={"4"} mb={"4"}>
        {note.content}
      </Box>
      <Flex mt={"5"} justifyContent={"space-between"} alignItems={"center"}>
        <Heading mt={"4"} as="h6" size="xs">
          {new Date(note.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </Heading>
        <HStack>
          <Button colorScheme="green">Update</Button>
          <Button onClick={() => Delete(note._id)} colorScheme="green">
            Delete
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default NoteCard;
