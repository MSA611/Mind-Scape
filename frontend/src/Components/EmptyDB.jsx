import { Box, Heading, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router";

const EmptyDB = () => {
  return (
    <Box maxW="full" margin={"250"} overflow="hidden">
      <Heading as="h2" size="xl">
        No Notes Created Please{" "}
        <Link to="/create">
          <Text color={useColorModeValue("blue", "teal.500")} as="ins">
            Create Now
          </Text>
        </Link>
      </Heading>
    </Box>
  );
};

export default EmptyDB;
