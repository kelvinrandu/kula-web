import React, { useEffect, useState } from "react";
import { Text, Flex, Spinner } from "@chakra-ui/react";
import OrderSingle from "../components/OrderSingle";

import App from "../components/App";

interface Props {}
const dashboard: React.FC<Props> = () => {
  return (
    <App>
      <Text mb={2} fontSize="sm">
        {"Active "}
        <b>{"Orders"}</b>
      </Text>

      <OrderSingle />

      <Flex justify="flex-end" as="i" color="gray.500">
        {`Showing 2 out of all items `}
      </Flex>
    </App>
  );
};

export default dashboard;
