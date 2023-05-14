import React from 'react'
import App from "../components/App";
import { Text, Flex, Spinner } from "@chakra-ui/react";

export default function orders() {
  return (
    <App>
      <Text mb={2} fontSize="sm">
        {"All"}
        <b>{"Orders"}</b>
      </Text>


      <Flex justify="flex-end" as="i" color="gray.500">
        {`Showing 0 out of all orders `}
      </Flex>
    </App>
  );
}
