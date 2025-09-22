import { Box, Flex, SimpleGrid, VStack } from "@chakra-ui/react";
import Nav from "../Components/Nav.jsx";
import NoteFunctions from "../zustand.js";
import { useEffect } from "react";
import NoteCard from "../Components/NoteCard.jsx";
import { wrap } from "framer-motion";
import EmptyDB from "../Components/EmptyDB.jsx";

const HomePage = () => {
  const { fetchNote, note } = NoteFunctions();

  useEffect(() => {
    const fetchData = async () => {
      await fetchNote();
    };
    fetchData();
  }, []);

  return (
    <Box minH={"100vh"}>
      <Nav />
      <VStack>{note.length == 0 && <EmptyDB />}</VStack>
      <Flex
        alignItems={"flex-start"}
        p={"6"}
        flexWrap={"wrap"}
        gap={"12"}
        columns={{
          base: 1,
          md: 2,
          lg: 3,
        }}
      >
        {note.map((note) => {
          return <NoteCard note={note} key={note._id} />;
        })}
      </Flex>
    </Box>
  );
};

export default HomePage;
