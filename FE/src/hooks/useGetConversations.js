import React from 'react'
import { useEffect,useState } from 'react'
import toast from 'react-hot-toast';
const useGetConversations = () => {
 const [loading ,setLoading]=useState(false);
 const [conversations , setConversations]=useState([]);
 useEffect(()=>{
const getConverstaions=async()=>{
    setLoading(true);
    try {
        const res=await fetch('/api/user/getuser')
        console.log(res)
        const data = await res.json()
        console.log("data from conversations hook",data)
        if(data.error){
        throw new Error(data.error)
        }
        setConversations(data)
    } catch (error) {
        toast.error(error.message)
    }
    finally{
        setLoading(false)
    }
}
getConverstaions()
 },[])
 return{loading ,conversations}
}

export default useGetConversations