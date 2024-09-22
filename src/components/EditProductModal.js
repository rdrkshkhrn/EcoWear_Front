import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    Stack,
    Textarea,
    FormControl,
    FormLabel,
    Select,
    HStack,
    Text,
    VStack,
    IconButton,
    Image,
    useToast,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { FiX } from "react-icons/fi";
import { axiosWrapper, baseURL } from "../utilities/AxiosWrapper";
  
  const EditProductModal = ({ post, isOpen, onClose, refetchPosts }) => {
    const [clothType, setClothType] = useState(post.clothType);
    const [description, setDescription] = useState(post.description);
    const [price, setPrice] = useState(post.price);
    const [minOrder, setMinOrder] = useState(post.minOrder);
    const [size, setSize] = useState(post.size);
    const [existingImages, setExistingImages] = useState(post.images || []); 
    const [newImages, setNewImages] = useState([]); 
    const [errorMessage, setErrorMessage] = useState("");
    const toast = useToast();
  
    const handleRemoveExistingImage = (imageToRemove) => {
      if (existingImages.length > 1) {
        setExistingImages(existingImages.filter((img) => img !== imageToRemove));
      } else {
        setErrorMessage("At least one image is required.");
      }
    };
  
    const handleRemoveNewImage = (imageIndex) => {
      setNewImages(newImages.filter((_, index) => index !== imageIndex));
    };
  
    const handleNewImageUpload = (e) => {
      const files = Array.from(e.target.files);
      if (existingImages.length + newImages.length + files.length <= 5) {
        setNewImages([...newImages, ...files]);
      } else {
        setErrorMessage("You can upload a maximum of 5 images.");
      }
    };
  
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        
        let newImageIds = [];
          if (newImages.length > 0) {
            const imageData = new FormData();
            newImages.forEach((file) => imageData.append("file", file));
            const response = await axiosWrapper(
                "post",
                "/upload/images",
                imageData,
                { "Content-Type": "multipart/form-data" },
                toast,"",false
              );
            if(response!==null){
                newImageIds = response.fileUrls;
            }else{
                return;
            }
          }
      
          
          const formData = {
            clothType,
            description,
            price,
            minOrder,
            size,
            existingImages: JSON.stringify(existingImages), 
            newImages: newImageIds, 
          };
          const createResponse = await axiosWrapper("put",`/post/${post._id}`,formData,false,toast,"Post updated successfully.",true);
          
          if(createResponse !== null){
            if (newImageIds.length > 0) {
                setExistingImages([...existingImages, ...newImageIds]);
              }
              setNewImages([]);
              refetchPosts();
              onClose();
          }
      };
      
  
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleEditSubmit}>
              <VStack spacing={4}>
                
                <FormControl id="existingImages">
                  <FormLabel>Existing Images</FormLabel>
                  <HStack>
                    {existingImages.map((img, index) => (
                      <Stack key={index} position="relative">
                        <Image
                          src={`${baseURL}/files/${img}`}
                          alt={`Image ${index + 1}`}
                          boxSize="100px"
                        />
                        <IconButton
                          position="absolute"
                          top={0}
                          right={0}
                          icon={<FiX />}
                          size="xs"
                          colorScheme="red"
                          onClick={() => handleRemoveExistingImage(img)}
                          isDisabled={existingImages.length === 1}
                        />
                      </Stack>
                    ))}
                  </HStack>
                </FormControl>
  
                
                <FormControl id="newImages" >
                  <FormLabel w={'full'} >Upload New Images (Max 5)</FormLabel>
                  <Input
                    pt={1}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleNewImageUpload}
                    disabled={existingImages.length + newImages.length >= 5}
                  />
                  {newImages.map((img, index) => (
                    <Stack key={index} position="relative">
                      <Image
                        src={URL.createObjectURL(img)}
                        alt={`New Image ${index + 1}`}
                        boxSize="100px"
                      />
                      <IconButton
                        position="absolute"
                        top={0}
                        right={0}
                        icon={<FiX />}
                        size="xs"
                        colorScheme="red"
                        onClick={() => handleRemoveNewImage(index)}
                      />
                    </Stack>
                  ))}
                </FormControl>
  
                
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
  
                
                {errorMessage && (
                  <Text color="red.500" mb={4}>
                    {errorMessage}
                  </Text>
                )}
              </VStack>
            </form>
          </ModalBody>
  
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleEditSubmit}>
              Save Changes
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default EditProductModal;
  