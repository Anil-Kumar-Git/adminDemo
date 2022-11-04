import { loginApi } from "./Index";

const middleLogin = async (value) => {
  if (value.value && value.password) {
    let responce = await loginApi(value);
    if (responce?.status == "200") {
      if (responce?.data.role === "admin") {
        localStorage.setItem("token", responce?.token);
        localStorage.setItem("adminAuth", responce?.data);
        return { data: responce?.data };
      }
      return { message: "* only admin can access this page" };
    } else if (responce?.status == "400") {
      return { message: responce.message };
    } else {
      return { message: responce.message };
    }
  } else {
    return { message: "please fill all fields" };
  }
};

export { middleLogin };
