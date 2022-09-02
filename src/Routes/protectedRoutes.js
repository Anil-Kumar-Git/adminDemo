import React,{useEffect} from "react";
import {Outlet,Navigate  } from "react-router-dom";

const ProtectedComponent=(props)=>{

    useEffect(()=>{
    props.auth(true)    
   },[])

    const auth=localStorage.getItem("token")
    return auth?<Navigate to="/"></Navigate>:<Outlet/>
}

export default ProtectedComponent;