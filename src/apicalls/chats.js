import {axiosInstance} from "./index";

export const GetAllChats = async  () => {
    try {
        const response = await axiosInstance.get("/api/chats/getAllChats");
        return response.data;
    }
    catch (e){
        throw e;
    }
}

export const CreateNewChat = async (chatMembers) => {
    try {
        const response = await axiosInstance.post("/api/chats/createNewChat", chatMembers)
        return response.data;
    }
    catch (error){
        throw error;
    }



}