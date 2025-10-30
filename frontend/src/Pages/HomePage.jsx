import { Box, Flex, SimpleGrid, VStack } from "@chakra-ui/react";
import Nav from "../Components/Nav.jsx";
import NoteFunctions from "../zustand.js";
import { useEffect, useState } from "react";
import NoteCard from "../Components/NoteCard.jsx";
import EmptyDB from "../Components/EmptyDB.jsx";
import Loading from "../Components/Loading.jsx";

const HomePage = () => {
  const { fetchNote, note } = NoteFunctions();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetchNote();
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Box minH={"100vh"}>
      <Nav />

      {loading && <Loading />}
      <VStack>{note.length == 0 && !loading ? <EmptyDB /> : null}</VStack>

      <Box
        p="6"
        sx={{
          columnCount: { base: 1, md: 2, lg: 3 },
          columnGap: "24px",
        }}
      >
        {note.map((note) => {
          return <NoteCard note={note} key={note._id} />;
        })}
      </Box>
    </Box>
  );
};

export default HomePage;
