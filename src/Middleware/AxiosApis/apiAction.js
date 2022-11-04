import axios from "axios"
let token = localStorage.getItem("token");

const API_URL = "http://34.199.164.237:5000";
//post

const Post=async(url,data)=>{
    try{
        const response = await axios.post(`${API_URL}/${url}`,data,{
            headers: { Authorization: token },
          })
        return response.data
    }catch(err){
       throw err.response.data
    }
}

const Put=async(url,data)=>{
    try{
        const response = await axios.post(`${API_URL}/${url}`,data,{
            headers: { Authorization: token },
          })
        return response.data
    }catch(err){
       throw err.response.data
    }
}

const Delete=async(url,data)=>{
    try{
        const response = await axios.post(`${API_URL}/${url}`,data,{
            headers: { Authorization: token },
          })
        return response.data
    }catch(err){
       throw err.response.data
    }
}

const Get=async(url,data)=>{
    try{
        const response = await axios.post(`${API_URL}/${url}`,data,{
            headers: { Authorization: token },
          })
        return response.data
    }catch(err){
       throw err.response.data
    }
}


export {
    Post,
    Put,
    Delete,
    Get
}