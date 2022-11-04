import axios  from "axios";
import { Post } from "./apiAction";

const loginApi = async (value) => {
    // console.log(value,"value")
    try{
        let responce = await Post(`users/authenticate`,value);
        console.log(responce,"responce allApi")
        return responce
    }
    catch(err){
        throw err
    }
  }
      
     

      export{
        loginApi
      }