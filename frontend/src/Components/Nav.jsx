import { AddIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router";

const Nav = () => {
  const { colorMode, toggleColorMode } = useColorMode();
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
          <Button colorScheme="blue">Logout</Button>
          <Link to="/create">
            <Button colorScheme="blue">+</Button>
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
