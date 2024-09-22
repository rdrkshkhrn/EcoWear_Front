import React from "react";
import {
  Box,
  Flex,
  Heading,
  Avatar,
  Link as ChakraLink,
  HStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { axiosWrapper } from "../utilities/AxiosWrapper";



const Navbar = ({ username }) => {

  const location = useLocation();
  const { pathname } = location; 
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = async () =>{
    const createResponse = await axiosWrapper("post","/logout",{},false,toast,"Logout successfully !!",true);
       if(createResponse !== null){
        navigate("/");
       }
  }

  return (
    <Box bg="cyan.700" py={3} boxShadow="md">
      <Flex
        px={4}
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex alignItems="center">
          <Avatar name={username} size="sm" bg="teal.500" mr={3} />
          <Heading as="h3" size="md" color="white">
            {username}
          </Heading>
        </Flex>

        <HStack gap={4}>
          
       {pathname ==='/home/mypost' ? <ChakraLink
            as={Link}
            to="/home"
            display="flex"
            alignItems="center"
            _hover={{ textDecoration: "none" }}
          >
            <Text color={'white'} fontSize={'sm'} >All posts</Text>
          </ChakraLink>:
          <ChakraLink
            as={Link}
            to="/home/mypost"
            display="flex"
            alignItems="center"
            _hover={{ textDecoration: "none" }}
          >
            <Text color={'white'} fontSize={'sm'}>My posts</Text>
          </ChakraLink>}
          
          <Text color={'white'} fontSize={'sm'} cursor={'pointer'} onClick={()=>handleLogout()}>Log out</Text>
          <ChakraLink
            as={Link}
            to="/home/account"
            display="flex"
            alignItems="center"
            _hover={{ textDecoration: "none" }}
          >
            <CgProfile size={"32px"} color="white" />
          </ChakraLink>
          
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
