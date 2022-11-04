import { loginApi } from "./allApis";


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

export { middleLogin };
