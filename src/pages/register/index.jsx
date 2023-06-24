
import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {RegisterUser} from "../../apicalls/users";
import toast from "react-hot-toast";
function Register(){
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });
    const register = async () => {
        try {
            const response = await RegisterUser(user);
            if (response.success){
                toast.success(response.message)
            }else toast.error(response.message)
        }
        catch (error){
            toast.error(error.message)
        }
    }
    useEffect(() => {
        if (localStorage.getItem("token"))
        {navigate("/")}
    }, []);

    return(
        <div className= "h-screen bg-orange-700 flex items-center justify-center">
            <div className= "bg-white shadow-md p-5 flex flex-col gap-5 w-96" >
                <h1 className="text-2xl uppercase">Chat App Register</h1>
                <hr />
                <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({...user, name: e.target.value})}
                placeholder="Enter your name"
                />
                <input
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    placeholder="Enter your Email"
                />
                <input
                    type="password"
                    placeholder="Enter your Password"
                />
                <button onClick={register} className="contained-btn">Register</button>
                <Link to="/login " className="underline">
                    Already have an account? Login
                </Link>
            </div>

        </div>
    )
}
export default Register