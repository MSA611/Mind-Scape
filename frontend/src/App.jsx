import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router";
import HomePage from "./Pages/HomePage.jsx";
import CreatePage from "./Pages/CreatePage.jsx";

const App = () => {
  return (
    <Box minH={"100vh"}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
};

export default App;
