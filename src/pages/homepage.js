import { Box, Card, CardBody, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Signin from "../components/signin";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Signup from "../components/signup";
import { axiosWrapper } from "../utilities/AxiosWrapper";

function StarterPage() {
  const [isSignIn,setSetSignIn] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
    
      const response = await axiosWrapper('get','/user',{},null,null,"",false);
      if (response !== null) {
        navigate('/home');
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <Flex direction={'column'} justifyContent={'center'} h={'100vh'} w={'full'}  alignItems={'center'} mt={-16}>
      <Card flexDir={"column"} maxW={{base:'260px', sm:'400px'}} justifyContent={"center"} alignItems={'center'}>
       <CardBody> <Heading mb={6}>EcoWear</Heading>
        
        {isSignIn? <Signin />:
         <Signup />}
         <Text mt={3} color={'blue'} textDecoration={'underline'} cursor={'pointer'} onClick={() => setSetSignIn(!isSignIn)}>
           {isSignIn?"Don't have an account! No worries, create one":"Already have an account, quickly sign in"}
         </Text></CardBody>
      </Card>
    </Flex>
  );
}

export default StarterPage;
