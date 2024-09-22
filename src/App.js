import { Box, ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "./UserContext";
import { Route, Routes } from "react-router-dom";
import StarterPage from "./pages/homepage";
import ProtectedRoutes from "./pages/userHomepage";
function App() {
 
  return (
    <ChakraProvider>
      <UserProvider>
          <Box>
            <Routes>
              <Route path="/" element = {<StarterPage/>}/>
              <Route path="/home/*" element = {<ProtectedRoutes />}/>
            </Routes>
          </Box>
      </UserProvider>
    </ChakraProvider>
  );
}

export default App;
