import React from 'react'
import App from "../components/App";
import { Text, Flex, Spinner } from "@chakra-ui/react";

export default function restaurant() {
  return (
    <App>
      <Text mb={2} fontSize="sm">
        {"All "}
        <b>{"Restaurants"}</b>
      </Text>

      <Flex justify="flex-end" as="i" color="gray.500">
        {`Showing 0 out of all restaurants `}
      </Flex>
    </App>
  );
}
