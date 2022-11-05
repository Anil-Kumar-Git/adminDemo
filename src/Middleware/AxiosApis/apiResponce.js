import { forgetApi, loginApi, verifyApi } from "./allApis";


const middleLogin = async (value) => {
  if (value.value && value.password && value.userType && value.type) {
    try {
      let responce = await loginApi(value);
      if (responce.code=="200") {
        localStorage.setItem("token", responce?.accessToken);
        localStorage.setItem("adminAuth", JSON.stringify(responce?.data));
        return { data: responce?.data  };
      }
    } 
    catch (err) {
      console.log(err, "error apiResponce");
      if(err.code=="400"){
        return { message: err.message };
      }else{
        return { message: err.message };
      }
    }
  } else {
    return { message: "please fill all fields" };
  }
};

const middleForget = async (value) => {
    try {
      let responce = await forgetApi(value);
      console.log(responce, "responce apiresponse");
      if (responce.code=="200") {
        localStorage.setItem("forgetId", responce?.data.verificationId);
        localStorage.setItem("userEmail", value);
        return { data: responce?.data ,message: responce.message};
      }
    } 
    catch (err) {
      console.log(err, "error apiResponce");
      if(err.code=="400"){
        return { message: err.message };
      }else{
        return { message: err.message };
      }
    }
};

const middleForgetVerify = async (value) => {
  try {
    let responce = await verifyApi(value);
    console.log(responce, "responce apiresponse");
    if (responce.code=="200") {
      localStorage.setItem("token", responce?.accessToken);
      return { data: responce  };
    }
  } 
  catch (err) {
    console.log(err, "error apiResponce");
    if(err.code=="400"){
      return { message: err.message };
    }else{
      return { message: err.message };
    }
  }
};

export { middleLogin,middleForget,middleForgetVerify };
