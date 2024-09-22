import React from "react";
import {
  Text,
  Image,
  useDisclosure,
  Button,
  Card,
  Divider,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  GridItem,
  HStack,
  Tag,
  Badge,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import ProductModal from "./ProductModal";
import EditProductModal from "./EditProductModal"; 
import { FaTrash, FaEdit } from "react-icons/fa";
import { axiosWrapper, baseURL } from "../utilities/AxiosWrapper";

function ProductCard({ post, owner, refetchPosts }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } =
    useDisclosure(); 
  const toast = useToast();

  const handleDelete = async () => {
    const deleteResponse = await axiosWrapper("delete",`/post/${post._id}`,{},null,toast,"post deleted successfully",true);
      if(deleteResponse !== null){
        await refetchPosts();
      }
  };

  return (
    <GridItem>
      <Card h={"full"}>
        <CardBody>
          {owner && (
            <HStack mb={3} >
              <IconButton onClick={handleDelete} icon={<FaTrash />} />
              <IconButton onClick={onEditOpen} icon={<FaEdit />} />
            </HStack>
          )}
          <Image
            src={`${baseURL}/files/${post.images?.[0]}`}
            alt="post image"
            borderRadius="lg"
            h={200}
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{post.clothType}</Heading>
            <Text noOfLines={2} h={50}>
              {post.description}
            </Text>
            <Badge
              borderRadius={4}
              variant={"solid"}
              colorScheme="teal"
              w={"fit-content"}
            >
              {post.size}
            </Badge>
            <HStack w={"full"} justify={"space-between"}>
              <Text color="blue.600" fontSize="xl">
                ₹{post.price}
              </Text>
              <Tag fontSize="sm">Min Qty: {post.minOrder}</Tag>
            </HStack>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button variant="solid" colorScheme="teal" w={"full"} onClick={onOpen}>
            More info
          </Button>
        </CardFooter>
      </Card>

      <ProductModal post={post} isOpen={isOpen} onClose={onClose} owner={owner} />
      <EditProductModal 
        post={post}
        isOpen={isEditOpen}
        onClose={onEditClose}
        refetchPosts={refetchPosts}
      />
    </GridItem>
  );
}

export default ProductCard;
