import React, { useState,useEffect } from "react";
import { Url } from "../Middleware/BaseUrl";
import { useNavigate } from "react-router-dom";
import { validator } from "../Middleware/Validation";
import { middleReset } from "../Middleware/AxiosApis/apiResponce";
import { Button, Spinner } from "react-bootstrap";

const ChangePassword = (props) => {
  const navigate = useNavigate();
  const [error, setError] = useState(" ");
  const [loading,setLoading]=useState(false)
  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
  });

  // const [error, setError] = useState({
  //   password: "",
  //   confirmPassword: "",
  // });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    // validateInput(e);
  };

  const changePassword = async () => {
    if(validator.allValid()){
      setError("")
      setLoading(true);
      const allValues = {
        password:input.password,
      };
      const res = await middleReset(allValues);
      console.log(res, "respo");
      if (res?.data) {
        setLoading(false);
        navigate(`/login`)
      } else {
        setLoading(false);
        setError(res.message);
      }
    }else{
      console.log(validator,"else")
      validator.showMessageFor("password");
      validator.showMessageFor("confirmPassword");
    }
  }

  // const validateInput = (e) => {
  //   let { name, value } = e.target;
  //   setError((prev) => {
  //     const stateObj = { ...prev, [name]: "" };
  //     switch (name) {
  //       case "password":
  //         if (!value) {
  //           stateObj[name] = "Please enter Password.";
  //         } else if (input.confirmPassword && value !== input.confirmPassword) {
  //           stateObj["confirmPassword"] =
  //             "Password and Confirm Password does not match.";
  //         } else {
  //           stateObj["confirmPassword"] = input.confirmPassword
  //             ? ""
  //             : error.confirmPassword;
  //         }
  //         break;

  //       case "confirmPassword":
  //         if (!value) {
  //           stateObj[name] = "Please enter Confirm Password.";
  //         } else if (input.password && value !== input.password) {
  //           stateObj[name] = "Password and Confirm Password does not match.";
  //         }
  //         break;

  //       default:
  //         break;
  //     }
  //     return stateObj;
  //   });
  // };

  // const changePassword = async () => {
  //   const value = input.password
  //   console.log(value,"value")
  //   const token=window.location.href.split("/").pop()
  //   console.log(token,"tokenId")
  //   let responce = await fetch(`${Url}/user/reset`, {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ token: token , password:value}),
  //   });
  //   let result = await responce.json();
  //   console.log("responce",responce)
  //   console.log(result,"")
  //   if (result.success) {
  //     alert(result.message);
  //     navigate("/login");
  //   } else {
  //     const error = result.message;
  //     if (error == "validation error") {
  //       setTimeout(() => {
  //         setErrorNew("");
  //       }, 2500);
  //       setErrorNew(result.errors.newPassword.message);
  //     } 
  //     console.log(result.errors.newPassword.message);
  //   }
  // };

  return (
    <div>
      <main className="main">
        <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex justify-content-center py-4">
                    <a
                      href="index.html"
                      className="logo d-flex align-items-center w-auto"
                    >
                      <img src="assets/img/logoA1.png" alt="" />
                      <span className="d-none d-lg-block">DemoAdmin</span>
                    </a>
                  </div>

                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">
                          Change Password
                        </h5>
                      </div>
                      <div className="text-center small error-red">{error}</div>
                      <div className="col-12">
                        <label htmlFor="yourUsername" className="form-label">
                          Password
                        </label>
                        <div className="input-group has-validation">
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={input.password}
                            onChange={onInputChange}
                            onBlur={()=>validator.showMessageFor('password')}
                            onFocus={()=>validator.hideMessageFor("password")}
                          />
                       
                        </div>
                      </div>
                      <span className="small error-red">
                      {validator.message("password",input.password,"required|min:8")} 
                        {/* {!validator.fields.password &&
                            validator.errorMessages.password} */}
                        </span>
                      {/* <span className="error-red">{errorNew}</span>
                          {error.password && (
                            <span className="err error-red">
                              {error.password}
                            </span>
                          )} */}
                      <div className="col-12">
                        <label htmlFor="yourUsername" className="form-label">
                         confirm Password
                        </label>
                        <div className="input-group has-validation">
                          <input
                            type="password"
                            name="confirmPassword"
                            className="form-control"
                            value={input.confirmPassword}
                            onChange={onInputChange}
                            // onBlur={validateInput}
                            onBlur={()=>validator.showMessageFor('confirmPassword')}
                            // onFocus={()=>validator.hideMessageFor("confirmPassword")}
                          ></input>
                        </div>
                      </div>
                      {/* {error.confirmPassword && (
                            <span className="err error-red">
                              {error.confirmPassword}
                            </span>
                          )} */}
                          <span className="small error-red">
                           {validator.message("confirmPassword",input.confirmPassword,`required|in:${input.password}`)} 

                            {/* {!validator.fields.confirmPassword &&
                            validator.errorMessages.confirmPassword} */}
                          </span>
                         <br/>
                      <div className="text-center">
                        {loading?
                         <Button
                         className="btn btn-primary w-100"
                         variant="primary"
                         disabled
                       >
                         <Spinner
                           as="span"
                           animation="grow"
                           size="sm"
                           role="status"
                           aria-hidden="true"
                         />
                         Loading...
                       </Button>:
                        <button
                          type="submit"
                          onClick={changePassword}
                          className="btn btn-primary"
                        >
                          Change Password
                        </button>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ChangePassword;
