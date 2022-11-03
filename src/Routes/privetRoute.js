import React,{useEffect} from "react";
import {Outlet,Navigate  } from "react-router-dom";

const PrivetComponent=(props)=>{

    // useEffect(()=>{
    //     props.auth(false)    
    //    },[])

    const auth=localStorage.getItem("token")
    return auth?<Outlet/>:<Navigate to="/login"></Navigate>
}

export default PrivetComponent;