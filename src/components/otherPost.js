import React, { useState,useEffect } from "react";
import {
  Box,
  Text,
 Grid
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { axiosWrapper } from "../utilities/AxiosWrapper";

function OtherPost() {
  const [otherPosts, setOtherPosts] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    fetchOtherPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const fetchOtherPosts = async () => {
    const response = await axiosWrapper("get","/otherposts",{},null,null,"",false);
      if(response !== null){
        setOtherPosts(response);
      }
      else{
        navigate("/"); 
      }
  };

  return (
    <Box>
      {otherPosts && otherPosts.length > 0 ? (
       <Grid gap={4}
       templateColumns={{
         base: "1fr",
         md: "repeat(3, 1fr)",
         lg: "repeat(4, 1fr)",
       }}>
         {otherPosts.map((post,index) => (
          <ProductCard key={index} post={post} owner={false}/>
        ))}
       </Grid>
      ) : (
        <Text textAlign="center" fontSize="lg">
          No other posts available yet
        </Text>
      )}

      
    </Box>
  );
}

export default OtherPost;
