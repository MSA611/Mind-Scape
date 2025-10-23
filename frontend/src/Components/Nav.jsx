import { AddIcon, MoonIcon, PlusSquareIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Text,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router";
import NoteFunctions from "../zustand";

const Nav = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { logout, authUser } = NoteFunctions();
  const toast = useToast();
  const handleLogout = async (e) => {
    e.preventDefault();
    const { success, message } = await logout();
    if (success) {
      toast({
        title: "Logout",
        duration: 3000,
        status: "success",
        isClosable: true,
        descripition: message,
      });
    } else {
      toast({
        title: "Logout",
        duration: 3000,
        status: "error",
        isClosable: true,
        descripition: message,
      });
    }
  };
  console.log("auth User : ", authUser);
  return (
    <Box>
      <Flex
        justifyContent={"space-around"}
        p={3}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="6xl"
          fontWeight="extrabold"
        >
          MIND-SCAPE
        </Text>
        <HStack>
          <Button colorScheme="blue">{`${authUser.fullName}`}</Button>

          <Button colorScheme="blue" onClick={handleLogout}>
            Logout
          </Button>

          <Link to="/create">
            <Button colorScheme="blue">
              <PlusSquareIcon fontSize={20} />
            </Button>
          </Link>
          <Button colorScheme="blue" onClick={toggleColorMode}>
            {colorMode === "light" ? <SunIcon /> : <MoonIcon />}
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Nav;
