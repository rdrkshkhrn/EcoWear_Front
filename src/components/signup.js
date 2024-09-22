import { Box, FormControl, FormLabel, Input, Button, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosWrapper } from "../utilities/AxiosWrapper";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axiosWrapper("post","/signup",{name,email,password},null,toast,"Account created successfully",true);
    if (response !== null) {
      console.log(response);
      navigate("/home"); 
    }
  };

  return (
    <Box w={'full'}>
      <form onSubmit={handleSubmit}>
        <FormControl id="name" isRequired mb={4} gap={2}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
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
        <Button type="submit">Sign Up</Button>
      </form>
    </Box>
  );
}

export default Signup;
