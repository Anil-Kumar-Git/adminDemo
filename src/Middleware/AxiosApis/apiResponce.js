import { forgetApi, loginApi, resetApi, verifyApi } from "./allApis";


const middleLogin = async (value) => {
  if (value.value && value.password && value.userType && value.type) {
    try {
      let response = await loginApi(value);
      if (response.code=="200") {
        localStorage.setItem("token", response?.accessToken);
        localStorage.setItem("adminAuth", JSON.stringify(response?.data));
        return { data: response?.data  };
      }
    } 
    catch (err) {
      console.log(err, "error apiresponse");
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
      let response = await forgetApi(value);
      console.log(response, "response apiresponse");
      if (response.code=="200") {
        localStorage.setItem("forgetId", response?.data.verificationId);
        localStorage.setItem("userEmail", value);
        return { data: response?.data ,message: response.message};
      }
    } 
    catch (err) {
      console.log(err, "error apiresponse");
      if(err.code=="400"){
        return { message: err.message };
      }else{
        return { message: err.message };
      }
    }
};

const middleForgetVerify = async (value) => {
  try {
    let response = await verifyApi(value);
    console.log(response, "response apiresponse");
    if (response.code == "200") {
      localStorage.setItem("token", response?.accessToken);
      return { data: response };
    }
  } catch (err) {
    console.log(err, "error apiresponse");
    if (err.code == "400") {
      return { message: err.message };
    } else {
      return { message: err.message };
    }
  }
};

const middleReset = async (value) => {
  try {
    let response = await resetApi(value);
    console.log(response, "response apiresponse");
    if (response.code == "200") {
      localStorage.setItem("token", response?.accessToken);
      return { data: response };
    }
  } catch (err) {
    console.log(err, "error apiresponse");
    if (err.code == "400") {
      return { message: err.message };
    } else {
      return { message: err.message };
    }
  }
};

export { middleLogin,middleForget,middleForgetVerify,middleReset };
