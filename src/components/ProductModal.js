import React from "react";
import {
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  Flex,
  HStack,
  Heading,
  Badge,
  Tag,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { baseURL } from "../utilities/AxiosWrapper";
function ProductModal({ post, isOpen, onClose, owner}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Product Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex wrap="wrap" gap={4} mb={4}>
            {post.images &&
              post.images.map((image, index) => (
                <Image
                  key={index}
                  src={`${baseURL}/files/${image}`}
                  alt={`Post Image ${index + 1}`}
                  boxSize="120px"
                  objectFit="cover"
                  borderRadius="md"
                  border="1px solid "
                />
              ))}
          </Flex>
          <Box  display={"flex"} flexDir={"column"} gap={2}>
          <HStack>
          <Heading size="md">{post.clothType}</Heading>
          <Badge
              borderRadius={4}
              variant={"solid"}
              colorScheme="teal"
              w={"fit-content"}
            >
              {post.size}
            </Badge>
          </HStack>
          
            <HStack w={"full"}>
              <Text fontWeight={'medium'} fontSize="xl">
                ₹{post.price}
              </Text>
              <Tag fontSize="sm">Min Qty: {post.minOrder}</Tag>
            </HStack>
            <Text>{post.description}</Text>
          </Box>
          {!owner && <Box mt={4} fontSize={'sm'}>
            <Text fontWeight="medium" fontSize="lg">
              Seller
            </Text>
            <Grid templateColumns={'1fr 1fr'} gap={0}>
              <GridItem>Name</GridItem>
              <GridItem>{post.userId.name}</GridItem>
              <GridItem>Email</GridItem>
              <GridItem>{post.userId.email}</GridItem>
              <GridItem>Mobile no.</GridItem>
              <GridItem>{post.userId.mobileNo??'--'}</GridItem>
              <GridItem>Street</GridItem>
              <GridItem>{post.userId.address?.street??"--"}</GridItem>
              <GridItem>City</GridItem>
              <GridItem>{post.userId.address?.city??"--"}</GridItem>
              <GridItem>State</GridItem>
              <GridItem>{post.userId.address?.state??"--"}</GridItem>
              <GridItem>Pin Code</GridItem>
              <GridItem>{post.userId.address?.pincode??"--"}</GridItem>
              
            </Grid>
          </Box>}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ProductModal;
