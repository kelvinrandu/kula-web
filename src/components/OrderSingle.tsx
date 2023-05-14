import React, { useState } from "react";
import { Collapse, Badge } from "@chakra-ui/react";
import { Box, Heading, Text, Flex, Spacer } from "@chakra-ui/layout";
import { TriangleDownIcon, TriangleUpIcon, AtSignIcon } from "@chakra-ui/icons";
// import ItemDetail from "../components/ItemDetail";
// import EditItem from "../components/EditItem";

export type ItemProps = {
  id: number;
  name: string;
  price: number;
  user: {
    name: string;
    email: string;
    auth0_id: string;
  };
  category: {
    name: string;
    description: string;
  };
};
// interface Props {
//   item?: ItemProps;
//   myItem?: Boolean;
// }
interface Props {
  order?: any;
  index?: any;
  // myItem?: Boolean;
}
const badgeColors = {
  food: "teal",
  drinks: "red",
  hardware: "blue",
  textile: "orange",
  electronics: "yellow",
};

const ItemSingle: React.FC<Props> = ({index,order}) => {
  const [itemDetail, setItemDetail] = useState(false);

  function ItemDetailHandler() {
    setItemDetail(!itemDetail);
  }
  return (
    <Box
      inde={index}
      _hover={{
        transform: "translateY(-3px)",
        boxShadow: "dark-lg",
      }}
      borderWidth="1px"
      borderRadius={8}
      mb={2}
      p={8}
      shadow="md"
      margin={2}
    >
      <Flex justify="center" align="center" wrap="wrap" grow={1}>
        <Heading fontSize="md" mr={4}>
          {order?.phone}
        </Heading>
        {/* <Spacer /> */}
        <AtSignIcon color="teal" />
        <Text> {order?.total} </Text>

        <Spacer />

        <Badge mr={5} colorScheme="red">
          {order?.restaurantName}
        </Badge>

        <Box
          as="button"
          alignSelf="right"
          float="right"
          onClick={() => ItemDetailHandler()}
        >
          <TriangleDownIcon color="teal" boxSize={6} />
        </Box>
      </Flex>
    </Box>
  );
};

export default ItemSingle;
