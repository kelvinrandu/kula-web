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
   const [category, setCategory] = useState<OptionType>();
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
    const [imageAsFile, setImageAsFile] = useState<Uint8Array| undefined>();
  const [category_id, setCategoryId] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState();
  const toast = useToast();

  const flushInputs = () => {
    setName("");
    setPrice("");
    setAmount("");
  };
  function handleSelect(data:any) {
    setSelectedOptions(data);
    
    console.log('data->',data)
  }
    const handleImageAsFile = (e:any) => {
      const image = e.target.files[0];
      setImageAsFile((imageFile) => image);
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
    console.log("categories", setCategory);
    if(imageAsFile){
                const mountainsRef = ref(storage, "mountains.jpg");

                // Create a reference to 'images/mountains.jpg'
                const mountainImagesRef = ref(storage, "images/mountains.jpg");

                // While the file names are the same, the references point to different files
                mountainsRef.name === mountainImagesRef.name; // true
                mountainsRef.fullPath === mountainImagesRef.fullPath;
                const uploadTask = uploadBytesResumable(
                  mountainImagesRef,
                  imageAsFile
                );
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
                    getDownloadURL(uploadTask.snapshot.ref).then(
                      async (downloadURL) => {
                        console.log("File available at", downloadURL);

                        const timestamp: string = Date.now().toString();
                        const restaurantCollections = doc(Firestore, "restaurants", timestamp);

                        const docsSnap = await setDoc(restaurantCollections, {
                          name: data?.name,
                          category: category,
                          image_url: downloadURL,
                        });
                      }
                    );
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
