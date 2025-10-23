import { MoonIcon, PlusSquareIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Text,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router";
import NoteFunctions from "../zustand";
import ModalComponent from "./ModalComponent";
import { useState } from "react";

const Nav = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { logout, authUser, updating, updateUserData } = NoteFunctions();
  const toast = useToast();

  const [information, setInformation] = useState({
    fullName: "",
    profilePic: "",
  });

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { success, message } = await updateUserData(information);
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

  const { isOpen, onOpen, onClose } = useDisclosure();
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
          <Button onClick={onOpen} px={"5"} colorScheme="blue">
            <Flex align={"center"} gap={"2"}>
              <Avatar
                colorScheme="blue"
                size="sm"
                gap={"2"}
                name={authUser.fullName}
                src={authUser.profilePic}
              />
              <Text colorScheme="blue">{`${authUser.fullName}`}</Text>
            </Flex>
          </Button>

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

        {/* Modal */}
      </Flex>
      <ModalComponent isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Nav;
