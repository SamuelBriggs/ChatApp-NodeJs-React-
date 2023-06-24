import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {DeleteMessage, GetMessages, SendMessage} from "../../../apicalls/messages";
import moment from "moment";


function ChatArea(){
    const [newMessage, setNewMessage] = useState("")
     const {selectedChatBox, user} = useSelector((state) => state.userReducer)
    const recipientUser = selectedChatBox.chatMembers.find((mem) => mem._id !== user._id);
    const [messages, setMessages] = useState([])
    const [hovering, setHovering] = useState(false);

    const handleMouseOver = () => {
        setHovering(true);
    };

    const handleMouseOut = () => {
        setHovering(false);
    };

     const sendNewMessage = async () => {
         try {
             const message = {
                 chat:selectedChatBox._id,
                 sender:user._id,
                 text: newMessage,
             }
             const response = await SendMessage(message);
             if(response.success){
                 setNewMessage("");
             }
         }
         catch (error){
         }
     }

     const getMessages = async () => {
        try {
            const response = await GetMessages(selectedChatBox._id)
            if (response.success){
                setMessages(response.data)
            }
        }
        catch (error){
            throw error
        }
    }

     useEffect(() => {getMessages()}, [selectedChatBox])

    return(
        <div className="bg-white h-[80vh] border rounded-2xl w-full flex flex-col justify-between p-5">

            <div className="flex gap-5 items-center mb-2">
                {recipientUser.profilePic ? <img src={recipientUser.profilePic}
                 alt="profile-pic"
                className="w-10 h-10 rounded-full"/>:
                    <div className="rounded-full text-white bg-orange-700 h-10 w-10 flex items-center justify-center" >
                        <h1 className="uppercase">
                        {recipientUser.name[0]}</h1>
                    </div>}
                <h1 className="uppercase text-orange-700 ">{recipientUser.name} <hr /></h1>

            </div>

            <div className="h-[50vh] overflow-y-scroll p-5">
                    <div className="flex flex-col gap-1">
                        {messages.map((message) =>{
                            const isSender = message.sender === user._id;
                            return <div className= {`flex ${isSender && 'justify-end'}`}>
                                <div className= "flex flex-col">
                                    <h1 className= {`flex ${isSender ? "bg-orange-700 text-white rounded-bl-none" : "bg-orange-600 text-white rounded-tr-none"} p-2 rounded-xl` }
                                    >{message.text}<div
                                        onMouseOver={handleMouseOver}
                                        onMouseOut={handleMouseOut}
                                        onClick={() => DeleteMessage(message._id)}
                                                        className="cursor-pointer ml-5"
                                    >  <i className="ri-more-2-fill font-extrabold"> </i> {hovering && <p>Delete</p>}</div></h1>


                                    <h1 className="text-gray-500 text-sm">{moment(message.createdAt).format("hh:mm A")}</h1>
                                </div>
                            </div>
                            }
                        )}
                    </div>
            </div>

            <div>
                <div>
                    <input
                    type= "text"
                    placeholder="Enter a message"
                    className="w-[90%] h-16 rounded-xl border-orange-200"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button
                    onClick={sendNewMessage}
                    className="ml-5 bg-orange-700 text-white">SEND</button>
                </div>
            </div>

        </div>
    )
}
export default ChatArea;