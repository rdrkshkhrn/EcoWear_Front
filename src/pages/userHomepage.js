import React, { useState, useEffect} from 'react';
import { Box} from "@chakra-ui/react";
import OtherPost from "../components/otherPost";
import {  Route, Routes, useNavigate } from "react-router-dom";
import Navbar from '../components/navbar';
import UserPost from '../components/userPost';
import Account from './account';
import { axiosWrapper } from '../utilities/AxiosWrapper';


function ProtectedRoutes() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axiosWrapper("get","/user",null,null,null,"",false)
        if(response !== null){
          setUser(response);
        }
        else{
          navigate("/");
        }
    };
    fetchUser();
  }, [navigate]);


  if(!user){
    return <></>;
  }

  return (
    <Box>
      {user && <Navbar username = {user.name}/>}
      <Routes>
        <Route path = "/" element = {<OtherPost/>}/>
        <Route path='/mypost' element = {<UserPost/>}/>
        <Route path="/account" element = {<Account/>}/>
      </Routes>
    </Box>
  );
}

export default ProtectedRoutes;
