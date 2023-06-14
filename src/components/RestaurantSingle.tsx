import React, { useState } from "react";
import { Collapse, Badge,Button } from "@chakra-ui/react";
import { Box, Heading, Text, Flex, Spacer } from "@chakra-ui/layout";
import { TriangleDownIcon, TriangleUpIcon, AtSignIcon } from "@chakra-ui/icons";
import ItemDetail from "../components/ItemDetail";
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
          {order?.name}
        </Heading>
        {/* <Spacer /> */}
        <AtSignIcon color="teal" />
        <Text> {order?.location} {" "}Diani Beach Road </Text>
        <Heading fontSize="md" ml={4} mr={4}>
          {order?.phone}
        </Heading>
        <Text> {order?.referenceNumber} </Text>

        <Spacer />

        <Badge mr={5} colorScheme="red">
          {" "}
          Pending
        </Badge>

        <Box
          as="button"
          alignSelf="right"
          float="right"
          onClick={() => ItemDetailHandler()}
        >
          {itemDetail ? (
            <TriangleUpIcon color="red" boxSize={6} />
          ) : (
            <TriangleDownIcon color="teal" boxSize={6} />
          )}
        </Box>
      </Flex>
      {itemDetail && (
        <Collapse in={itemDetail} animateOpacity style={{ zIndex: 10 }}>
          <Box py={10} p={2}>
            <Box fontWeight="700" d="flex" align="center" justify="center">
              <Button

                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%"
              >
                Activate
              </Button>
              <Button
                w="7rem"

                colorScheme="teal"
                variant="outline"
              >
                Edit
              </Button>
            </Box>

            {/* {item?.userByUser?.name !== user?.email && (
          <InputGroup>
            <form
              onSubmit={handleSubmit((data) =>
                onCreateOrder({
                  from_id,
                  to_id,
                  amount,
                  item_id: item_id,
                })
              )}
            >
              <Input
                autoFocus
                variant="outline"
                focusBorderColor="teal"
                color="teal"
                width="30vw"
                {...register("amount", { required: true })}
                onChange={(e) => setAmount(parseInt(e.target.value))}
                placeholder="Number of items"
                type="number"
                value={amount}
              />
              <InputRightElement>
                <Button isLoading={loading} type="submit" size="md">
                  <AddIcon color="teal" />
                </Button>
              </InputRightElement>
            </form>
          </InputGroup>
        )} */}
          </Box>
          {/* <ItemDetail order={order} ItemDetailHandler={ItemDetailHandler} /> */}
        </Collapse>
      )}
    </Box>
  );
};

export default ItemSingle;
