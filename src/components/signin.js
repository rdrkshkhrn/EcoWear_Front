import { Box, FormControl, FormLabel, Input, Button, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosWrapper } from "../utilities/AxiosWrapper";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createResponse = await axiosWrapper("post","/signin",{ email, password },null,toast,null,true);
    //console.log(createResponse)
      if(createResponse !== null ){
        navigate("/home");
      }
  };

  return (
    <Box w={'full'}>
      <form onSubmit={handleSubmit}>
        <FormControl id="email" isRequired mb={4} gap={2}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired mb={4} gap={2}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button type="submit">Sign In</Button>
      </form>
    </Box>
  );
}

export default Signin;
