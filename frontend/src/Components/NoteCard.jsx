import { Box, Button, Flex, Heading, HStack, useToast } from "@chakra-ui/react";
import NoteFunctions from "../zustand";
import { Link } from "react-router";
import { useState } from "react";

const NoteCard = ({ note }) => {
  const { DelNote } = NoteFunctions();
  const [deleteState, setDeleteState] = useState(false);
  const toast = useToast();

  const Delete = async (p_id) => {
    setDeleteState(true);
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
    setDeleteState(false);
  };

  return (
    <Box
      flex={{ base: "100%", md: "48%", lg: "30%" }}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={"6"}
    >
      <Heading noOfLines={1} as="h5" size="sm">
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
          <Link to={`/note/${note._id}`}>
            <Button colorScheme="green">Update</Button>
          </Link>
          <Button
            disabled={deleteState}
            onClick={() => Delete(note._id)}
            colorScheme="green"
          >
            {deleteState ? "Deleting..." : "Delete"}
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default NoteCard;
