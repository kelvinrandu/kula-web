import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";

interface Props {}
const AddItemModal: React.FC<Props> = () => {

  const initialRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register } = useForm();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [category_id, setCategoryId] = useState(null);
  const toast = useToast();



  const flushInputs = () => {
    setName("");
    setPrice("");
    setAmount("");
  };

  const onOpenDealModal = () => {
    // if (!user?.sub) {
    //   //return toast
    //   return 1;
    // }

    onOpen();
  };

  return (
    <>
      <Flex p={6}>
        <Button
          onClick={onOpenDealModal}
          variant="solid"
          colorScheme="teal"
          align="center"
          minH="40px"
        //   w="60%"
        >
          Add Restaurant
        </Button>
      </Flex>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form
            // onSubmit={handleSubmit((data) =>
            //   onCreateItem(
            //     {
            //       name,
            //       price: data.price,
            //       amount: data.amount,
            //       category_id: data.category_id,
            //       user_id: data.amount,
            //     },
            //     onClose
            //   )
            // )}
          >
            <ModalHeader>Add Restaurant</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>name</FormLabel>
                <Input
                  autoFocus
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                  variant="filled"
                  value={name}
                  type="text"
                />
              </FormControl>
              <FormControl isRequired mt={6}>
                <FormLabel>Categories</FormLabel>
                <Input
                  autoFocus
                  variant="filled"
               
                  placeholder="price"
                  value={price}
                //   onChange={(e) => setPrice(parseInt(e.target.value))}
                  {...register("price", { required: true })}
                  type="number"
                />
              </FormControl>

              <FormControl isRequired mt={6}>
                <FormLabel>Picture</FormLabel>
                <Input
                  variant="filled"
                  value={amount}
                //   onChange={(e) => setAmount(parseInt(e.target.value))}
                  {...register("amount", { required: true })}
                  placeholder="Amount"
                  type="number"
                />
              </FormControl>

              {/* <FormControl mt={4}>
                <FormLabel htmlFor="category">Category</FormLabel>
                <Select
                  {...register("category_id", { required: true })}
                  name="category_id"
                  id="category"
                  onChange={(e) => setCategoryId(e.target.value)}
                  placeholder="Select Category"
                >
                  {data &&
                    data.categories.map(({ id, name }) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                </Select>
                <FormErrorMessage></FormErrorMessage>
              </FormControl> */}
            </ModalBody>

            <ModalFooter>
              <Button mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                // isLoading={loading}
                type="submit"
                variantColor="teal"
                variant="solid"
                colorScheme="teal"
                ml={3}
              >
                Create
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddItemModal;
