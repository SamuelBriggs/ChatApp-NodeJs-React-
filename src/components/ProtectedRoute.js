import React, {useEffect, useState} from 'react'
import {GetAllUsers, GetCurrentUser} from "../apicalls/users";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {SetAllChats, SetAllUsers, SetUser} from "../redux/userSlice";
import {GetAllChats} from "../apicalls/chats";

function ProtectedRoute({children}){




    const{user} = useSelector(state => state.userReducer)

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const getCurrentUser = async () => {
        try {
            const response = await GetCurrentUser()
            const allUsers = await GetAllUsers();
            const allChats = await GetAllChats();
            if(response.success){
                dispatch(SetUser(response.data))
                dispatch(SetAllUsers(allUsers.data))
                dispatch(SetAllChats(allChats.data))
            }else {
                localStorage.removeItem("token")
                navigate('/login')
            }
        }catch (error)
        {
            localStorage.removeItem("token")
            navigate('/login')
        }
    }
    useEffect(() => {
        if(localStorage.getItem("token")){
            getCurrentUser();
        } else {navigate("/login")}
    }, [])
    return(
        <div className="h-screen w-screen bg-orange-700 p-2">
            <div className= "flex justify-between p-5">
                <div className= " flex justify-between text-2xl">
                    <h1 className= "text-white ml-8 text-2xl uppercase font-bold"> Regnos Chat App</h1>
                </div>
                <div className= "flex gap-5 text-xl text-white">
                    <h1 className="underline">Hi there, {user?.name}</h1>
                 <h1 className="ml-5 cursor-pointer"
                    onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login")
                    }
                    }
                    >LOGOUT</h1>
                </div>
            </div>

            <div className="p-5">
                {children}
            </div>

        </div>

    )
}
export default ProtectedRoute;