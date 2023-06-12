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
import { doc, setDoc, collection } from "firebase/firestore";
import { Firestore } from "../firebase/index";
import Creatable from "react-select/creatable";
const options = [
  { value: "african", label: "African" },
  { value: "vegan", label: "Vegan" },
  { value: "italian", label: "Italian" },
  { value: "junk", label: "Junk" },
];
interface RestaurantData {
  name: string;
  categories: string[];
  image_url: string;
}
interface Props {}
const AddItemModal: React.FC<Props> = () => {
  const initialRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RestaurantData>();
  const onSubmit = async (data: RestaurantData) => {
    const timestamp: string = Date.now().toString();
    const restaurantCollections = doc(Firestore, "restaurants", timestamp);

    const docsSnap = await setDoc(restaurantCollections, {
      name: data?.name,
      category: data.categories,
      image_url: data.image_url,
    });
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
        >
          Add Restaurant
        </Button>
      </Flex>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Add Restaurant</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>name</FormLabel>
                <Input
                  autoFocus
                  placeholder="Name"
                  {...register("name")}
                  variant="filled"
                  type="text"
                />
              </FormControl>
              <FormControl isRequired mt={6}>
                <FormLabel>Categories</FormLabel>
                {/* <Input
                  autoFocus
                  variant="filled"
                  {...register("categories")}
                  placeholder="categories"
                  type="text"
                /> */}
                <Creatable isMulti={true} options={options} />
              </FormControl>

              <FormControl isRequired mt={6}>
                <FormLabel>Picture</FormLabel>
                <Input
                  variant="filled"
                  {...register("image_url")}
                  placeholder="Amount"
                  type="file"
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
