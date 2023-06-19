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
  { value: "asian", label: "Asian" },
  { value: "italian", label: "Italian" },
  { value: "american", label: "American" },
  { value: "european", label: "European" },
];
const options2: OptionType[] = [{ value: "100% vegan", label: "100% vegan" }];
interface RestaurantData {
  name: string;
  categories: string[];
  image_url: string;
}
interface Props {}
const Form1 = ({
  setName,
  setSelectedOptions,
  selectedOptions2,
  handleSelect2,
  handleImageAsFile,
  selectedOptions,
  handleSelect,
}: any) => {
  // const [show, setShow] = React.useState(false);
  // const [selectedOptions, setSelectedOptions] = useState();
  // const [selectedOptions2, setSelectedOptions2] = useState();
  // const [imageAsFile, setImageAsFile] = useState<Uint8Array | undefined>();
  // const handleClick = () => setShow(!show);
  // const handleImageAsFile = (e: any) => {
  //   const image = e.target.files[0];
  //   setImageAsFile((imageFile) => image);
  // };

  // function handleSelect(data: any) {
  //   setSelectedOptions(data);
  // }
  //   function handleSelect2(data: any) {
  //     setSelectedOptions2(data);
  //   }
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Details
      </Heading>

      <FormControl mr="5%">
        <FormLabel htmlFor="first-name" fontWeight={"normal"}>
          Restaurant name
        </FormLabel>
        <Input
          id="first-name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Restaurant name"
        />
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
const Form2 = ({ setEmail, setPhone, setLocation, setRating }: any) => {
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
          onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPhone(e.target.value)}
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
        <Input
          id="email"
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          placeholder="Diani Beach Road"
        />
        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
      </FormControl>
      <FormControl mt="2%">
        <FormLabel htmlFor="email" fontWeight={"normal"}>
          Ratings
        </FormLabel>
        <Input
          id="ratings"
          type="text"
          onChange={(e) => setRating(e.target.value)}
          placeholder="5 star"
        />
        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
      </FormControl>
    </>
  );
};
const Form3 = ({ setInstagram, setWebsite, setAbout }: any) => {
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
              onChange={(e) => setWebsite(e.target.value)}
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
              onChange={(e) => setInstagram(e.target.value)}
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
            onChange={(e) => setAbout(e.target.value)}
            focusBorderColor="brand.400"
            fontSize={{
              sm: "sm",
            }}
          />
          <FormHelperText>Brief description for your hotel</FormHelperText>
        </FormControl>
      </SimpleGrid>
    </>
  );
};
const EditItemModal: React.FC<Props> = () => {
  const initialRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState("");
  const [website, setWebsite] = useState("");
  const [instagram, setInstagram] = useState("");
  const [about, setAbout] = useState("");
  const [category, setCategory] = useState<OptionType>();
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [imageAsFile, setImageAsFile] = useState<Uint8Array | undefined>();
  const [category_id, setCategoryId] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState();
  const [selectedOptions2, setSelectedOptions2] = useState();

  const flushInputs = () => {
    setName("");
    setPrice("");
    setAmount("");
  };
  function handleSelect(data: any) {
    setSelectedOptions(data);
  }
  function handleSelect2(data: any) {
    setSelectedOptions2(data);
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
              name: name,
              email: email ? email : "N/A",
              phone: phone ? phone : "N/A",
              location: location ? location : "N/A",
              rating: rating ? rating : "N/A",
              instagram: instagram ? instagram : "N/A",
              about: about ? about : "N/A",
              website: website ? website : "N/A",
              category: selectedOptions,
              tags: selectedOptions2,
              image_url: downloadURL,
              active:false,
            });
              toast({
                title: "Restaurant  draft created.",
                description: "We've created a draft for you ",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
          });
        }
      );
    } else {
      const timestamp: string = Date.now().toString();
      const restaurantCollections = doc(Firestore, "restaurants", timestamp);

      const docsSnap = await setDoc(restaurantCollections, {
        name: name,
        email: email ? email : "N/A",
        phone: phone ? phone : "N/A",
        location: location ? location : "N/A",
        rating: rating ? rating : "N/A",
        instagram: instagram ? instagram : "N/A",
        about: about ? about : "N/A",
        website: website ? website : "N/A",
        category: selectedOptions,
        tags: selectedOptions2,
        image_url: "N/a",
        active:false
      });
       onClose();
        toast({
          title: "Restaurant  draft created.",
          description: "We've created a draft for you ",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
    }
  };

  return (
    <>
      <Flex>

        <Button
          w="7rem"
          colorScheme="teal"
          onClick={onOpenDealModal}
          variant="outline"
        >
          Edit
        </Button>
      </Flex>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Edit Restaurant</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
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
                {step === 1 ? (
                  <Form1
                    setSelectedOptions={setSelectedOptions}
                    handleSelect={handleSelect}
                    handleSelect2={handleSelect2}
                    setSelectedOptions2={setSelectedOptions2}
                    handleImageAsFile={handleImageAsFile}
                    setName={setName}
                  />
                ) : step === 2 ? (
                  <Form2
                    setEmail={setEmail}
                    setPhone={setPhone}
                    setLocation={setLocation}
                    setRating={setRating}
                  />
                ) : (
                  <Form3
                    setWebsite={setWebsite}
                    setInstagram={setInstagram}
                    setAbout={setAbout}
                  />
                )}
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
                      colorScheme="blue"
                      variant="solid"
                      type="submit"
                    >
                      Save
                    </Button>
                  ) : null}
                </Flex>
              </ButtonGroup>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditItemModal;
