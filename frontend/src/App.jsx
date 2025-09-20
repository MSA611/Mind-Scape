import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router";
import HomePage from "./Pages/HomePage.jsx";
import CreatePage from "./Pages/CreatePage.jsx";
import NoteDetails from "./Pages/NoteDetails.jsx";

const App = () => {
  return (
    <Box minH={"100vh"}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetails />} />
      </Routes>
    </Box>
  );
};

export default App;
