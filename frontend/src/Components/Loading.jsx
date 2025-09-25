import { Box, Flex, Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Flex
      position={"fixed"}
      top="0"
      left="0"
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
      zIndex="9999"
    >
      <Spinner thickness="4px" speed="0.65s" color="blue.500" size="lg" />
    </Flex>
  );
};

export default Loading;
