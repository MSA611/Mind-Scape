import { Box, SimpleGrid, useToast } from "@chakra-ui/react";
import Nav from "../Components/Nav.jsx";
import NoteFunctions from "../zustand.js";
import { useEffect } from "react";
import NoteCard from "../Components/NoteCard.jsx";

const HomePage = () => {
  const { fetchNote, note } = NoteFunctions();
  const toast = useToast();

  useEffect(() => {
    fetchNote();
  }, []);

  return (
    <Box minH={"100vh"}>
      <Nav />
      <SimpleGrid
        p={"6"}
        columns={{
          base: 1,
          md: 2,
          lg: 3,
        }}
        spacing={10}
      >
        {note.map((note) => {
          return <NoteCard note={note} key={note._id} />;
        })}
      </SimpleGrid>
    </Box>
  );
};

export default HomePage;
