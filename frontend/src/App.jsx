import { Box } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./Pages/HomePage.jsx";
import CreatePage from "./Pages/CreatePage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import SignupPage from "./Pages/SignupPage.jsx";
import NoteDetails from "./Pages/NoteDetails.jsx";
import NoteFunctions from "./zustand.js";
import Loading from "./Components/Loading.jsx";
import { useEffect } from "react";

const App = () => {
  const { authenticateUser, checkingAuth, authUser } = NoteFunctions();

  useEffect(() => {
    authenticateUser();
  }, []);

  if (checkingAuth) return <Loading />;

  return (
    <Box minH={"100vh"}>
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/create"
          element={authUser ? <CreatePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/note/:id"
          element={authUser ? <NoteDetails /> : <Navigate to={"/login"} />}
        />
      </Routes>
    </Box>
  );
};

export default App;
