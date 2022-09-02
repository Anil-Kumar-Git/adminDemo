import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePwdApi } from "../../Middleware/Apis/Index";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [message,setMessage]=useState("")
  const [errorOP, setErrorOP] = useState("");
  const [errorNew, setErrorNew] = useState("");
  const [input, setInput] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "currentPassword":
          if (!value) {
            stateObj[name] = "Please enter Current Password.";
          }
          break;

        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  setTimeout(() => {
    setMessage("")
    setErrorOP("")
    setErrorNew("")
  }, 2000);

  const changePassword = async () => {
    const value = {
      oldPassword: input.currentPassword,
      newPassword: input.password,
    };
    if(input.password && input.currentPassword && input.confirmPassword){
      const res= await changePwdApi(value)
      if(res.status==200){
           setMessage(res.message);
           localStorage.clear();
           navigate("/login");
      }else if(res.status==400){
        if(res.message=="validation error"){
          setErrorNew(res.errors.newPassword.message)
        }else{
          setErrorOP(res.message)
        } 
      }else{
            setMessage("Internal Server Error")
      }
    }else{
      setMessage("set all feilds")
    }
  }

  return (
    <div>
      <div>
      <span className="error" style={{color:"green"}}>{message}</span>
        <div className="row mb-3">
          <label
            htmlFor="currentPassword"
            className="col-md-4 col-lg-3 col-form-label"
          >
            Current Password
          </label>
          <div className="col-md-8 col-lg-9">
            <input
              name="currentPassword"
              type="password"
              className="form-control"
              id="currentPassword"
              value={input.currentPassword}
              onChange={onInputChange}
            />
            <span className="error-red">{errorOP}</span>
            {error.currentPassword && (
              <span className="err error-red">{error.currentPassword}</span>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <label
            htmlFor="newPassword"
            className="col-md-4 col-lg-3 col-form-label"
          >
            New Password
          </label>
          <div className="col-md-8 col-lg-9">
            <input
              type="password"
              name="password"
              className="form-control"
              value={input.password}
              onChange={onInputChange}
              onBlur={validateInput}
            ></input>
            <span className="error-red">{errorNew}</span>
            {error.password && (
              <span className="err error-red">{error.password}</span>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <label
            htmlFor="renewPassword"
            className="col-md-4 col-lg-3 col-form-label"
          >
            Re-enter New Password
          </label>
          <div className="col-md-8 col-lg-9">
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              value={input.confirmPassword}
              onChange={onInputChange}
              onBlur={validateInput}
            ></input>
            {error.confirmPassword && (
              <span className="err error-red">{error.confirmPassword}</span>
            )}
          </div>
        </div>
        <div className="text-center">
          <button
            type="submit"
            onClick={changePassword}
            className="btn btn-primary"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
