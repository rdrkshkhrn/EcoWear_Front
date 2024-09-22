import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Text,
  Heading,
  VStack,
  HStack,
  useToast,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";
import axios from "axios"; // Axios import
import { FiImage } from "react-icons/fi";
import { axiosWrapper } from "../utilities/AxiosWrapper";

function CreatePost({ isOpen, onClose, fetchUserPosts }) {
  const [imageFiles, setImageFiles] = useState([]); // Change for file upload
  const [clothType, setClothType] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [minOrder, setMinOrder] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const toast = useToast();

  const handleCreatePost = async (e) => {
    e.preventDefault();

    if (!clothType || !size || !price || !description || !minOrder) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();

    for (const file of imageFiles) {
      formData.append("file", file);
    }

    const uploadRes = await axiosWrapper(
      "post",
      "/upload/images",
      formData,
      { "Content-Type": "multipart/form-data" },
      toast,
      "Post created successfully.",
      true
    );
    if (uploadRes !== null) {
      //console.log(uploadRes);
      const fileUrls = uploadRes.fileUrls;

      const createResponse = await axiosWrapper(
        "post",
        "/createpost",
        { images: fileUrls, clothType, size, price, minOrder, description },
        false,
        toast,
        "",
        true
      );

      if (createResponse !== null) {
        setImageFiles([]);
        setClothType("");
        setSize("");
        setPrice("");
        setDescription("");
        setMinOrder("");
        setErrorMessage("");
        onClose();
        fetchUserPosts();
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a new post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box pb={6}>
            <form onSubmit={handleCreatePost}>
              <VStack spacing={4}>
                {/* Image Upload */}
                <FormControl id="image" mb={4} isRequired>
                  <FormLabel w={"full"} display={"flex"} flexDirection={"row"}>
                    <HStack>
                      <FiImage />
                      <Text>Upload Image(max 5 allowed)</Text>
                    </HStack>
                  </FormLabel>
                  <Input
                    pt={1}
                    px={2}
                    type="file"
                    onChange={(e) => setImageFiles([...e.target.files])} // Set the selected file
                    focusBorderColor="teal.500"
                    _hover={{ borderColor: "teal.400" }}
                    bg="white"
                    multiple
                  />
                </FormControl>

                {/* Cloth Type */}
                <FormControl id="clothType" isRequired>
                  <FormLabel>Cloth Type</FormLabel>
                  <Select
                    placeholder="Select cloth type"
                    value={clothType}
                    onChange={(e) => setClothType(e.target.value)}
                    focusBorderColor="teal.500"
                    bg="white"
                  >
                    <option value="Shirt">Shirt</option>
                    <option value="T-Shirt">T-Shirt</option>
                    <option value="Jeans">Jeans</option>
                    <option value="Jacket">Jacket</option>
                    <option value="Other">Other</option>
                  </Select>
                </FormControl>

                {/* Size */}
                <FormControl id="size" isRequired>
                  <FormLabel>Size</FormLabel>
                  <Select
                    placeholder="Select size"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    focusBorderColor="teal.500"
                    bg="white"
                  >
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                  </Select>
                </FormControl>

                {/* Price */}
                <FormControl id="price" isRequired>
                  <FormLabel>Price</FormLabel>
                  <Input
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    focusBorderColor="teal.500"
                    _hover={{ borderColor: "teal.400" }}
                    bg="white"
                  />
                </FormControl>

                {/* Min. Order Quantity */}
                <FormControl id="minOrder" isRequired>
                  <FormLabel>Min. Order Quantity</FormLabel>
                  <Input
                    type="number"
                    placeholder="Enter quantity"
                    value={minOrder}
                    onChange={(e) => setMinOrder(e.target.value)}
                    focusBorderColor="teal.500"
                    _hover={{ borderColor: "teal.400" }}
                    bg="white"
                  />
                </FormControl>

                {/* Description */}
                <FormControl id="description" isRequired>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    focusBorderColor="teal.500"
                    bg="white"
                  />
                </FormControl>

                {/* Error Message */}
                {errorMessage && (
                  <Text color="red.500" mb={4}>
                    {errorMessage}
                  </Text>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  colorScheme="teal"
                  width="full"
                  _hover={{ bg: "teal.600" }}
                >
                  Create Post
                </Button>
              </VStack>
            </form>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default CreatePost;
