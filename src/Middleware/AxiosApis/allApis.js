import axios from "axios";
import { Post } from "./apiAction";

const loginApi = async (value) => {
  // console.log(value,"value")
  try {
    let responce = await Post(`users/authenticate`, value);
    console.log(responce, "responce allApi");
    return responce;
  } catch (err) {
    throw err;
  }
};

const forgetApi = async (value) => {
  // console.log(value,"value")
  try {
    let responce = await Post(`users/initiate/forgot`, value);
    console.log(responce, "responce allApi");
    return responce;
  } catch (err) {
    throw err;
  }
};

const verifyApi = async (value) => {
  // console.log(value,"value")
  try {
    let responce = await Post(`users/verify/forgot/token`, value);
    console.log(responce, "responce allApi");
    return responce;
  } catch (err) {
    console.log(err, "err allApi");
    throw err;
  }
};


export { loginApi ,forgetApi,verifyApi};
