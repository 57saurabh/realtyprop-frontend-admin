import axios from 'axios';
import React, { Children, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../Context/UserContext';
import Loader from '../utils/loader/Loader';

function PrivateRouting({children}) {
  const { login } = useContext(UserContext);
  const [loding , setLoding]= useState(true);
  const navigate = useNavigate();
  const validateToken = async()=>{
    try {
      const response = await axios.post("https://realtyprop-backend.vercel.app/auth/get-user-by-id",{},{
        headers:{
          Authorization:  `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.data.success){
        login(response.data.data)
        setLoding(false)
      }else{
        localStorage.removeItem('token');
        alert(response.data.message);
        setLoding(false)
        navigate("/login")
      }
    } catch (error) {
        localStorage.removeItem('token');
        alert(error.message);
      setLoding(false)
        navigate("/login")
    }
  }
  useEffect(()=>{
    if (localStorage.getItem("token")) {
      validateToken()
      
    }else{
      navigate("/login")
    }
  },[])
  return (
    <div>
      {loding ? <Loader/> : <>{children} </>}
    </div>
  )
}

export default PrivateRouting