import React, { useState } from "react";
import { Collapse, Badge, Button, useToast } from "@chakra-ui/react";
import { Box, Heading, Text, Flex, Spacer } from "@chakra-ui/layout";
import { TriangleDownIcon, TriangleUpIcon, AtSignIcon } from "@chakra-ui/icons";
import ItemDetail from "../components/ItemDetail";
import EditItemModal from "../components/EditItemModal";
import { Firestore, storage } from "../firebase/index";
import { doc, setDoc, collection, updateDoc } from "firebase/firestore";

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

const ItemSingle: React.FC<Props> = ({ index, order }) => {
  const [itemDetail, setItemDetail] = useState(false);
  const toast = useToast();

  function ItemDetailHandler() {
    setItemDetail(!itemDetail);
  }
  async function ActivateRestaurant(order: any) {
    console.log("res", order);
    const restaurantCollections = doc(Firestore, "restaurants", order.id);

    const docsSnap = await updateDoc(restaurantCollections, {
      active: true,
    });
    toast({
      title: "Restaurant  activated succesfully.",
      description: "We've activated your restaurant ",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }
  async function DeactivateRestaurant(order: any) {
    console.log("res", order);
    const restaurantCollections = doc(Firestore, "restaurants", order.id);

    const docsSnap = await updateDoc(restaurantCollections, {
      active: false,
    });
    toast({
      title: "Restaurant deactivated successfully.",
      description: "We've deactivated the restaurant for you ",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
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
          {order?.data?.name}
        </Heading>
        {/* <Spacer /> */}
        <AtSignIcon color="teal" />
        <Text> {order?.data?.location ?order?.data?.location :'Diani Beach Road'}  </Text>
        <Heading fontSize="md" ml={4} mr={4}>
          {order?.data?.phone}
        </Heading>
        <Text> {order?.referenceNumber} </Text>

        <Spacer />
        {order?.data?.active ? (
          <Badge mr={5} colorScheme="teal">
            {" "}
            Active
          </Badge>
        ) : (
          <Badge mr={5} colorScheme="red">
            {" "}
            Pending
          </Badge>
        )}

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
              {order?.data.active ? (
                <Button
                  onClick={() => DeactivateRestaurant(order)}
                  colorScheme="red"
                  variant="solid"
                  w="7rem"
                  mr="5%"
                >
                  Deactivate
                </Button>
              ) : (
                <Button
                  onClick={() => ActivateRestaurant(order)}
                  colorScheme="teal"
                  variant="solid"
                  w="7rem"
                  mr="5%"
                >
                  Activate
                </Button>
              )}

              <EditItemModal  order={order}/>
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
