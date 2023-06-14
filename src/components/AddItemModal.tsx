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
  Progress,
  Box,
  ButtonGroup,
  Heading,
  GridItem,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { doc, setDoc, collection } from "firebase/firestore";
import {
  ref,
  // getStorage,
  uploadBytesResumable,
  getDownloadURL,
  uploadString,
  uploadBytes,
} from "@firebase/storage";
import { Firestore, storage } from "../firebase/index";
import Creatable from "react-select/creatable";
type OptionType = {
  value: string;
  label: string;
};
const options: OptionType[] = [
  { value: "african", label: "African" },
  { value: "vegan", label: "Vegan" },
  { value: "italian", label: "Italian" },
  { value: "junk", label: "Fast Food" },
];
const options2: OptionType[] = [{ value: "100% vegan", label: "100% vegan" }];
interface RestaurantData {
  name: string;
  categories: string[];
  image_url: string;
}
interface Props {}
const Form1 = () => {
  const [show, setShow] = React.useState(false);
  const [selectedOptions, setSelectedOptions] = useState();
  const [selectedOptions2, setSelectedOptions2] = useState();
  const [imageAsFile, setImageAsFile] = useState<Uint8Array | undefined>();
  const handleClick = () => setShow(!show);
  const handleImageAsFile = (e: any) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };

  function handleSelect(data: any) {
    setSelectedOptions(data);
  }
    function handleSelect2(data: any) {
      setSelectedOptions2(data);
    }
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
         Details
      </Heading>

      <FormControl mr="5%">
        <FormLabel htmlFor="first-name" fontWeight={"normal"}>
          Restaurant name
        </FormLabel>
        <Input id="first-name" placeholder="Restaurant name" />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="last-name" fontWeight={"normal"}>
          Category
        </FormLabel>
        <Creatable
          value={selectedOptions}
          onChange={handleSelect}
          isMulti={true}
          options={options}
        />
      </FormControl>

      <FormControl mt="2%">
        <FormLabel htmlFor="email" fontWeight={"normal"}>
          Tags
        </FormLabel>
        <Creatable
          value={selectedOptions2}
          onChange={handleSelect2}
          isMulti={true}
          options={options2}
        />
        {/* <FormHelperText>We'll never share your location.</FormHelperText> */}
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="password" fontWeight={"normal"} mt="2%">
          Picture
        </FormLabel>
        <Input variant="filled" onChange={handleImageAsFile} type="file" />
      </FormControl>
    </>
  );
};
const Form2 = () => {
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Contacts
      </Heading>
      <FormControl mr="5%">
        <FormLabel htmlFor="first-name" fontWeight={"normal"}>
          Restaurant email
        </FormLabel>
        <Input
          id="first-name"
          type="email"
          placeholder="restaurant@gmail.com"
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="last-name" fontWeight={"normal"}>
          Restaurant phone
        </FormLabel>
        <InputGroup size="sm">
          <InputLeftAddon
            bg="gray.50"
            _dark={{
              bg: "gray.800",
            }}
            color="gray.500"
            rounded="md"
          >
            +254
          </InputLeftAddon>
          <Input
            type="tel"
            placeholder="711651196"
            focusBorderColor="brand.400"
            rounded="md"
          />
        </InputGroup>
      </FormControl>

      <FormControl mt="2%">
        <FormLabel htmlFor="email" fontWeight={"normal"}>
          Location
        </FormLabel>
        <Input id="email" type="text"  placeholder="Diani Beach Road"/>
        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
      </FormControl>
      <FormControl mt="2%">
        <FormLabel htmlFor="email" fontWeight={"normal"}>
          Ratings
        </FormLabel>
        <Input id="ratings" type="text" placeholder="5 star"/>
        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
      </FormControl>
    </>
  );
};
const Form3 = () => {
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal">
        Socials
      </Heading>
      <SimpleGrid columns={1} spacing={6}>
        <FormControl as={GridItem} colSpan={[3, 2]}>
          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
          >
            Website
          </FormLabel>
          <InputGroup size="sm">
            <InputLeftAddon
              bg="gray.50"
              _dark={{
                bg: "gray.800",
              }}
              color="gray.500"
              rounded="md"
            >
              http://
            </InputLeftAddon>
            <Input
              type="tel"
              placeholder="www.example.com"
              focusBorderColor="brand.400"
              rounded="md"
            />
          </InputGroup>
        </FormControl>
        <FormControl as={GridItem} colSpan={[3, 2]}>
          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
          >
            Instagram
          </FormLabel>
          <InputGroup size="sm">
            <InputLeftAddon
              bg="gray.50"
              _dark={{
                bg: "gray.800",
              }}
              color="gray.500"
              rounded="md"
            >
            @
            </InputLeftAddon>
            <Input
              type="tel"
              placeholder="instagram username"
              focusBorderColor="brand.400"
              rounded="md"
            />
          </InputGroup>
        </FormControl>

        <FormControl id="email" mt={1}>
          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
          >
            About
          </FormLabel>
          <Textarea
            placeholder="you@example.com"
            rows={3}
            shadow="sm"
            focusBorderColor="brand.400"
            fontSize={{
              sm: "sm",
            }}
          />
          <FormHelperText>
            Brief description for your hotel
          </FormHelperText>
        </FormControl>
      </SimpleGrid>
    </>
  );
};
const AddItemModal: React.FC<Props> = () => {
  const initialRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<OptionType>();
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [imageAsFile, setImageAsFile] = useState<Uint8Array | undefined>();
  const [category_id, setCategoryId] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState();

  const flushInputs = () => {
    setName("");
    setPrice("");
    setAmount("");
  };
  function handleSelect(data: any) {
    setSelectedOptions(data);

    console.log("data->", data);
  }
  const handleImageAsFile = (e: any) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };
  const onOpenDealModal = () => {
    onOpen();
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RestaurantData>();
  const onSubmit = async (data: RestaurantData) => {
    if (imageAsFile) {
      const mountainsRef = ref(storage, "mountains.jpg");

      // Create a reference to 'images/mountains.jpg'
      const mountainImagesRef = ref(storage, "images/mountains.jpg");

      // While the file names are the same, the references point to different files
      mountainsRef.name === mountainImagesRef.name; // true
      mountainsRef.fullPath === mountainImagesRef.fullPath;
      const uploadTask = uploadBytesResumable(mountainImagesRef, imageAsFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);

            const timestamp: string = Date.now().toString();
            const restaurantCollections = doc(
              Firestore,
              "restaurants",
              timestamp
            );

            const docsSnap = await setDoc(restaurantCollections, {
              name: data?.name,
              category: selectedOptions,
              image_url: downloadURL,
            });
          });
        }
      );
    }
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
              {/* <FormControl isRequired>
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
     
                <Creatable
                  value={selectedOptions}
                  onChange={handleSelect}
                  isMulti={true}
                  options={options}
                />
              </FormControl>

              <FormControl isRequired mt={6}>
                <FormLabel>Picture</FormLabel>
                <Input
                  variant="filled"
                  onChange={handleImageAsFile}
                  type="file"
                />
                
              </FormControl> */}
              <Box
                // borderWidth="1px"
                rounded="lg"
                // shadow="1px 1px 3px rgba(0,0,0,0.3)"
                // maxWidth={800}
                p={6}
                m="10px auto"
                as="form"
              >
                <Progress
                  hasStripe
                  value={progress}
                  mb="5%"
                  mx="5%"
                  isAnimated
                ></Progress>
                {step === 1 ? <Form1 /> : step === 2 ? <Form2 /> : <Form3 />}
              </Box>
            </ModalBody>

            <ModalFooter>
              <ButtonGroup mt="5%" w="100%">
                <Flex w="100%" justifyContent="space-between">
                  <Flex>
                    <Button
                      onClick={() => {
                        setStep(step - 1);
                        setProgress(progress - 33.33);
                      }}
                      isDisabled={step === 1}
                      colorScheme="teal"
                      variant="solid"
                      w="7rem"
                      mr="5%"
                    >
                      Back
                    </Button>
                    <Button
                      w="7rem"
                      isDisabled={step === 3}
                      onClick={() => {
                        setStep(step + 1);
                        if (step === 3) {
                          setProgress(100);
                        } else {
                          setProgress(progress + 33.33);
                        }
                      }}
                      colorScheme="teal"
                      variant="outline"
                    >
                      Next
                    </Button>
                  </Flex>
                  {step === 3 ? (
                    <Button
                      w="7rem"
                      colorScheme="red"
                      variant="solid"
                      onClick={() => {
                        toast({
                          title: "Restaurant  draft created.",
                          description: "We've created a draft for you ",
                          status: "success",
                          duration: 3000,
                          isClosable: true,
                        });
                      }}
                    >
                      Save
                    </Button>
                  ) : null}
                </Flex>
              </ButtonGroup>
              {/* <Button mr={3} onClick={onClose}>
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
              </Button> */}
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddItemModal;
