import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser}=useAuthContext()
  const signup = async (userName, password, gender) => {
  
    const sucess = handleInputErrors({ userName, password, gender });
    if (!sucess) return;
    setLoading(true);
    try {
        const res=await fetch("/api/auth/signUp",{
            method:"POST",
            headers: { "Content-Type": "application/json" },
				body: JSON.stringify({  userName,  gender,password }),
			
        })
        const data = await res.json();
        console.log(data)
			if (data.error) {
       
				throw new Error(data.error);
			}
      localStorage.setItem("chat-user",JSON.stringify(data))
    
setAuthUser(data)
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

function handleInputErrors({ userName, password, gender }) {
  
  if (!userName || !password || !gender) {
    toast.error("please fill all fields ");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
