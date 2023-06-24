import {axiosInstance} from "./index";


export const SendMessage = async (message) => {
    try {
        const response = await axiosInstance.post('/api/messages/newMessage', message)
        return (response).data
    }
        catch (error){
        throw error
        }

}

export const GetMessages = async (chatId) => {

    try {
        const response = await axiosInstance.get(`/api/messages/getAllMessages/${chatId}`)
        return response.data
    }
    catch (error){
        throw error

    }
}

export const DeleteMessage = async (messageId) => {
    try {
       const response =  await axiosInstance.delete(`/api/messages/deleteMessage/${messageId}`)
        return response.data
    }
    catch (error){
        throw error
    }
}