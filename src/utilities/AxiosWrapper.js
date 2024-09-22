import axios from "axios";

export const baseURL =  'https://eco-wear-3.vercel.app';
export async function axiosWrapper(method,endpoint,body,headers,toast,successMessage,isShowToast) {
    try {
        let response = null;
        const actualHeader = headers ? headers: {"Content-Type" : "application/json"};
        if (method === "get") {
            response = await  axios.get(`${baseURL}${endpoint}`, { withCredentials: true },{headers:actualHeader});
        } else if (method === "post") {
            response = await axios.post(`${baseURL}${endpoint}`, body, { withCredentials: true });
        } else if (method === "put") {
            response = await axios.put(`${baseURL}${endpoint}`, body, { withCredentials: true });
        } else if (method === "delete") {
            response = await  axios.delete(`${baseURL}${endpoint}`, { withCredentials: true });
        } 
        
        if(response!==null && (response.status === 200 || response.status === 201)){
            if (isShowToast && successMessage && toast) {
                toast({
                    title: successMessage,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            }
            return response.data;
        }
        else if (toast) {
            toast({
                title: 'Error',
                description: 'Something went wrong, try again!',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
        
        return null;
    } catch (error) {

        if (toast) {
            toast({
                title: 'Error',
                description: 'Something went wrong, try again!',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
        return null;
    }
}

