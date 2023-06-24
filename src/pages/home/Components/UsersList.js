import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {CreateNewChat} from "../../../apicalls/chats";
import {SetAllChats, SetSelectedChatBox} from "../../../redux/userSlice";

function UsersList({searchKey}) {
    const {allUsers, allChats, user, selectedChatBox} = useSelector((state) => state.userReducer)
    const dispatch = useDispatch();

    console.log(allChats + "   ....this is all chat.....")
    console.log(selectedChatBox + "    this is selected chattttt")

    const createNewChat = async (recipientId) => {
        try {
            const response = await CreateNewChat([user._id, recipientId])
            if (response.success){
                const newChat = response.data;
                const updatedChats = [...allChats, newChat]
                console.log(newChat + " this is new chatttt")
                dispatch(SetAllChats(updatedChats))
                dispatch(SetSelectedChatBox(newChat))

            }
        }
        catch (error){
        }
    }
    const openChat = (recipientUserId) =>{
        const chat = allChats.find((chat) =>
            chat.chatMembers.map((member) => member._id).includes(user._id) &&
            chat.chatMembers.map((member) => member._id).includes(recipientUserId)
        );
        if (chat){
            dispatch(SetSelectedChatBox(chat));
        }
    }

   const getData = () => {
        return allUsers.filter((users) =>
            (users.name.toLowerCase().includes(searchKey.toLowerCase()) && searchKey) ||
            allChats.some((chat) =>
            chat.chatMembers.map((mem) => mem._id).includes(users._id)
            )
        )
   }

   const getIsSelectedChatOrNot = (userObj) => {
        if (selectedChatBox){
            return selectedChatBox.chatMembers.map((mem) => mem._id).includes(userObj._id)
        }
        return false;
   }

    return ( <div className="flex flex-col gap-3 mt-5">
            {getData().map((users) => {
            return (
            <div
                key={users._id}
                onClick={() => openChat(users._id)}
                className= {`shadow-sm border p-5 rounded-2xl bg-white flex justify-between items-center
                            ${getIsSelectedChatOrNot(users) && "border-orange-700 border-2"}
                `}>
                <div className="flex gap-5 items-center">
                    {users.profilePic? <img src={users.profilePic}
                    alt="profile-pic"
                    className="w-10 h-10 rounded-full"/>:
                     <div className="rounded-full bg-orange-700 text-white h-10 w-10 flex items-center justify-center" ><h1 className="uppercase text 2xl">{users.name[0]}</h1></div>}
                    <h1>{users.name}</h1>
                    </div>
                <div
                    onClick={() => createNewChat(users._id)}
                     >
                    {!allChats.find((chat) => chat.chatMembers.map((member) => member._id).includes(users._id)) && (
                        <button className="bg-white p-1 border-primary border px-3 text-primary rounded-md">Say Hi to {users.name.toUpperCase()}!</button>)}
                    </div>
                    </div>
                    );
                    })}
        </div>
        )
}
export default UsersList;