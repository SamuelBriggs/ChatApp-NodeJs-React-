import React, {useState} from "react";
import UserSeach from "./Components/UserSeach";
import ChatArea from "./Components/ChatArea";
import UsersList from "./Components/UsersList";
import {useSelector} from "react-redux";

function Home(){
    const [searchKey, setSearchKey] = useState("")
    const {selectedChatBox} = useSelector(state => state.userReducer)
    return (
        <div className="flex">
            <div className= "w-96">
                <UserSeach
                searchKey={searchKey}
                setSearchKey={setSearchKey}
                />
                <UsersList
                searchKey={searchKey}/>
            </div>

            <div className="w-full">
                {selectedChatBox && <ChatArea/>}
            </div>

        </div>
    )
}
export default Home;