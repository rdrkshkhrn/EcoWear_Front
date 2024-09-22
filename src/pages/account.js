import React, { useState, useEffect } from "react";
import { Box, FormControl, FormLabel, Input, Button, Heading, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import { axiosWrapper } from "../utilities/AxiosWrapper";
function Account() {
  const [mobileNo, setMobileNo] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [userName, setUserName] = useState(null);
  const toast = useToast();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const response = await axiosWrapper('get',"/user",{},null,toast,null,null);
    if(response!==null){
      const {name, mobileNo, address } = response;
    setUserName(name)
    setMobileNo(mobileNo || "");
    setAddress(address || { street: "", city: "", state: "", pincode: "" });
    }
  };

  const handleUpdate = async (e) => {

    e.preventDefault();

    if (!mobileNo || !address.street || !address.city || !address.state || !address.pincode) {
        setErrorMessage("Please fill in all required fields.");
        return;
      }
      const response = await axiosWrapper('put','/user/update',{mobileNo,address},null, toast,"Profile updated!",true);

  };

  

  return (
    <Box px={12} mt={8}>
      <Heading as="h2" size="lg" mb={5}>Update Profile</Heading>
      <form onSubmit={handleUpdate}>
        <FormControl id="mobileNo" mb={4} isRequired>
          <FormLabel>Mobile Number</FormLabel>
          <Input
            type="text"
            maxLength={10}
            minLength={10}
            placeholder="Enter mobile number"
            value={mobileNo || ""}
            onChange={(e) => setMobileNo(e.target.value)}
          />
        </FormControl>

        <FormControl id="street" mb={4} isRequired>
          <FormLabel>Flat/Society/Street</FormLabel>
          <Input
            type="text"
            placeholder="Enter area"
            value={address.street || ""}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
          />
        </FormControl>

        <FormControl id="city" mb={4} isRequired>
          <FormLabel>City</FormLabel>
          <Input
            type="text"
            placeholder="Enter city"
            value={address.city || ""}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
          />
        </FormControl>

        <FormControl id="state" mb={4} isRequired>
          <FormLabel>State</FormLabel>
          <Input
            type="text"
            placeholder="Enter state"
            value={address.state || ""}
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
          />
        </FormControl>

        <FormControl id="pincode" mb={4} isRequired>
          <FormLabel>Pin Code</FormLabel>
          <Input
            type="text"
            placeholder="Enter pin code"
            maxLength={6}
            minLength={6}
            value={address.pincode || ""}
            onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
          />
        </FormControl>
        {errorMessage && (
            <Text color="red.500" mb={4}>
              {errorMessage}
            </Text>
          )}
        <Button mt={3} colorScheme="teal" type="submit">
          Update Profile
        </Button>
      </form>
 
    </Box>
  );
}

export default Account;
