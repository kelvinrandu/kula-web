import React, { useState } from "react";
import { EmailIcon, AddIcon } from "@chakra-ui/icons";
import {
  Input,
  Text,
  useToast,
  Box,
  Button,
  Icon,
  
} from "@chakra-ui/react";
// import { ItemProps } from "../components/ItemSingle";BiRestaurant
import { GrHomeRounded } from "react-icons/gr";
import { BiRestaurant } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { FcShop } from "react-icons/fc";
import { InputRightElement, InputGroup } from "@chakra-ui/react";
// import { useUser } from "@auth0/nextjs-auth0";
// import { CREATE_ORDERS_MUTATION } from "../../graphql/mutations";
// import { useMutation} from "@apollo/react-hooks";
// //tobe deleted
// import { GET_ORDERS_QUERY } from "../../graphql/queries";


type Iprops = {
  order:any;
  ItemDetailHandler: () => void;
};
const ItemDetail: React.FC<Iprops> = (props) => {
  // const { user, error, isLoading } = useUser();

  // const { item } = props;

  const [amount, setAmount] = useState<number | null>(null);
  // const [to_id] = useState(item.userByUser.name);
  // const [from_id] = useState(user?.sub);
  // const [price] = useState(item.price);
  // const [item_id] = useState(item.id);
  const [totalPrice, setTotalPrice] = useState<number>(1);
  const toast = useToast();
  const { handleSubmit, register, setError } = useForm();
  //refetch after mutation


  function flushAmount() {
    return setAmount(null);
  }



  return (
    <>
      <Box py={10} p={2}>
        <Box fontWeight="700" d="flex" align="center" justify="center">
          <Text color="teal" mr="5px">
            {/* get data from user.role */}
            <Text>
              {" "}
              <Icon as={GrHomeRounded} boxSize={4} backgroundColor="teal" />
            </Text>
          </Text>
          <Text fontSize="20px" letterSpacing={3}>
            {" "}
            {props?.order?.restaurantName}
          </Text>
        </Box>

        <Box fontWeight="700" fontSize="15px">
          {/* <EmailIcon color="teal" mr="5px" boxSize={4} />  */}
          {props.order.items.map((order: any) => {
            return (
              <>
                {order?.item?.title} @ {order?.item?.price} * 1
              </>
            );
          })}
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
    </>
  );
};
export default ItemDetail;
