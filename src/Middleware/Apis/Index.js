import { postConfig } from "./apiConfig";

// const rootUrl = "https://demoprojectapis.herokuapp.com";
const rootUrl= "http://localhost:3000"
const token = localStorage.getItem("token");

let config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
  method: "get",
};

const loginApi = async (value) => {
    let responce = await fetch(`${rootUrl}/users/login`, postConfig(value));
    let res = await responce.json();
    console.log(res,"res loginApi");
    return res
    };

export const getApi = async () => {
  let responce = await fetch(`${rootUrl}/user/alldata`, config);
  let res = await responce.json();
  return { status: res.status, data: res.data, message: res.message };
};

export const searchApi = async (search) => {
  let responce = await fetch(
    `${rootUrl}/user/getUserBySearch/${search}`,
    config
  );
  let res = await responce.json();
  return { status: res.status, data: res.data, message: res.message };
};

export const deleteApi = async (id) => {
  const responce = await fetch(`${rootUrl}/user/deleteUser/${id}`, config);
  let res = await responce.json();
  return { status: res.status, message: res.message };
};

export const editApi = async (value) => {
  const id = value._id;
  let config = {
    method: "put",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  };
  let responce = await fetch(`${rootUrl}/user/updateUser/${id}`, config);
  let res = await responce.json();
  return { status: res.status, message: res.message };
};

export const addApi = async (value) => {
  let config = {
    method: "post",
    body: JSON.stringify(value),
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  let responce = await fetch(`${rootUrl}/user/register`, config);
  let res = await responce.json();
  return { status: res.status, data: res.data, message: res.message };
};

export const changePwdApi = async (value) => {
  const config = {
    method: "put",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  };
  let responce = await fetch(`${rootUrl}/user/changePassword`, config);
  let res = await responce.json();
  return { status: res.status, message: res.message };
};

export const getSingleApi = async () => {
  const id = localStorage.getItem("adminId");
  let responce = await fetch(`${rootUrl}/user/getSingleUser/${id}`, config);
  let res = await responce.json();
  return { status: res.status, data: res.data, message: res.message };
};

export const editProfileApi = async (value) => {
  const id = localStorage.getItem("adminId");
  const config = {
    method: "put",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  };
  let responce = await fetch(`${rootUrl}/user/updateUser/${id}`, config);
  let res = await responce.json();
  return { status: res.status, message: res.message };
};

export const sendMailApi = async (value) => {
  let config = {
    method: "post",
    body: JSON.stringify({ value}),
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }
  let responce = await fetch(`${rootUrl}/user/info`, config);
  let res = await responce.json();
  console.log(res,"resdsljkdoe");
  return { status: res.status, data: res.data, message: res.message };
};

export{
  loginApi,
}