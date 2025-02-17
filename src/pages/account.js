import React, { useState, useEffect } from "react";
import { Box, FormControl, FormLabel, Input, Button, Heading, Text, useToast } from "@chakra-ui/react";
import { axiosWrapper } from "../utilities/AxiosWrapper";
import { useNavigate } from "react-router-dom";

function Account() {
  const [mobileNo, setMobileNo] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  

  useEffect(() => {
    fetchUserData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserData = async () => {
    const response = await axiosWrapper('get',"/user",{},null,toast,null,null);
    if(response!==null){
      const {mobileNo, address } = response;
    setMobileNo(mobileNo || "");
    setAddress(address || { street: "", city: "", state: "", pincode: "" });
    }
    else{
      navigate("/"); 
    }
  };

  const handleUpdate = async (e) => {

    e.preventDefault();

    if (!mobileNo || !address.street || !address.city || !address.state || !address.pincode) {
        setErrorMessage("Please fill in all required fields.");
        return;
      }
      await axiosWrapper('put','/user/update',{mobileNo,address},null, toast,"Profile updated!",true);

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
