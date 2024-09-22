import { useState, useEffect, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) =>{

    const [postState,setPostState] = useState(null);

    useEffect(()=>{
        const storedState = localStorage.getItem("state");
        if(storedState){
            setPostState(storedState);
        }
    },[])

    return (
        <UserContext.Provider value={{postState,setPostState}}>
            {children}
        </UserContext.Provider>
    )
}