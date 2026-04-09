
import api from "../api";
import type { UserProps } from "../types/UserProps";

const createUsers = async (user: UserProps ) => {    
    try{
        const response = await api.post("/users", user);
        return response.data;   
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

const useUsers = () => {
    return {
        createUsers
    };
};

export default useUsers;