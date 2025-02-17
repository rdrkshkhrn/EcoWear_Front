import { Flex, Spinner, Text } from "@chakra-ui/react";

export default function LoadingScreen() {
    return (
      <Flex
        align="center"
        justify="center"
        direction="column"
        height="100vh"
        bg="gray.50"
      >
        <Spinner
          size="xl"
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          mb={4}
        />
        <Text fontSize="lg" color="gray.600">
          Loading, please wait...
        </Text>
      </Flex>
    );
  }