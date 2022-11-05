import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Url } from "../Middleware/BaseUrl";
import { Spinner, Button } from "react-bootstrap";
import PasswordModel from "../Components/models/PasswordModel";
import { loginApi } from "../Middleware/Apis/Index";
// import { middleLogin } from "../Middleware/Apis/middleApis";
import { loginUser } from "../Services/login/actions";
import { middleForget, middleLogin } from "../Middleware/AxiosApis/apiResponce";
import { validator } from "../Middleware/Validation";

const ForgetPwd = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  //Axios Api Login //Live Bright-swipe-Apis
  const recoverPwd = async () => {
    setError("");
    if (validator.allValid()) {
      setLoading(true);
      const allValues = {
        value: email,
        type: "email",
      };
      const res = await middleForget(allValues);
      console.log(res, "respo");
      if (res?.data && res?.message) {
        setLoading(false);
        navigate(`/verify-email/${email}/${res?.data.verificationId}`)
      } else {
        setLoading(false);
        setError(res.message);
      }
    } else {
      // setError("enter email feilds")
    }
  };


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
                  {/* End Logo */}
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        {/* <h5 className="card-title text-center pb-0 fs-4">
                          Login to Your Account
                        </h5> */}
                        <p className="text-center small">
                          Enter your email for Verify Code
                        </p>
                      </div>
                      <div className="text-center small error-red">{error}</div>
                      <br />
                      <div className="row g-3 needs-validation" noValidate="">
                        <div className="col-12">
                          <label htmlFor="yourUsername" className="form-label">
                            Email
                          </label>
                            <input
                              type="text"
                              name="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="form-control"
                              id="yourUsername"
                              required
                              onBlur={()=>validator.showMessageFor('email')}
                            />  
                             {validator.message("email",email,"required")}                       
                        </div>
                          <span className="small error-red">
                          {!validator.fields.email &&
                            validator.errorMessages.email}
                        </span>
                        <div className="col-12">
                          {loading ? (
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
                            </Button>
                          ) : (
                            <>
                            <div className="mb-3">
                            <button
                            className="btn btn-primary w-100"
                            type="submit"
                            onClick={recoverPwd}
                          >
                            Recover password
                           </button>
                           </div>
                            <Link to="/login" style={{ color: "white" }}>
                            <button
                              className="btn btn-primary w-100"
                              type="submit"
                            >
                                  Back To Login
                            </button>
                           </Link>
                           </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <PasswordModel />
    </div>
  );
};

export default ForgetPwd;
