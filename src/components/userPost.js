import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  useDisclosure,
  Button,
  Grid,
  HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CreatePost from "./createPost";
import ProductCard from "./ProductCard";
import { axiosWrapper } from "../utilities/AxiosWrapper";
//import { FiEdit, FiTrash2 } from "react-icons/fi";

function UserPost() {
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();
  const {
    isOpen: isOpenPostModel,
    onClose: onClosePostModel,
    onOpen: onOpenPostModel,
  } = useDisclosure();
  useEffect(() => {
    fetchUserPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserPosts = async () => {
    const response = await axiosWrapper("get","/userposts",{},null,null,"",false);
      if(response !== null){
        setUserPosts(response);
      }
      else{
        navigate("/"); 
      }
  };

  return (
    <Box p={6}>
      
      <CreatePost isOpen={isOpenPostModel} onClose={onClosePostModel} fetchUserPosts = {fetchUserPosts} />
      <HStack justifyContent={"space-between"}>
      <Text
        fontSize="2xl"
        mb={6}
        fontWeight="bold"
        textAlign="center"
        color="teal.500"
      >
        My Posts
      </Text>
      <Button onClick={() => onOpenPostModel()}>Create Post</Button>
      </HStack>
      {userPosts.length > 0 ? (
        <Grid
          gap={4}
          templateColumns={{
            base: "1fr",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
        >
          {userPosts.map((post, index) => (
            <ProductCard post={post} key={index} owner = {true} refetchPosts={fetchUserPosts}/>
          ))}
        </Grid>
      ) : (
        <Text textAlign="center" fontSize="lg" color="gray.600">
          You haven't created any posts yet.
        </Text>
      )}
    </Box>
  );
}

export default UserPost;
