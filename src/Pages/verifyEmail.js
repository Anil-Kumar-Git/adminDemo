import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";
// import { middleLogin } from "../Middleware/Apis/middleApis";
import { validator } from "../Middleware/Validation";
import { middleForget, middleForgetVerify } from "../Middleware/AxiosApis/apiResponce";

const VerifyEmail = () => {
  const {email,verifyId}=useParams();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [verifyIds, setVerifyId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message,setMessage]=useState("")

  useEffect(()=>{
    setVerifyId(verifyId)
  },[verifyId])

  //Axios Api Login //Live Bright-swipe-Apis
  const verifyPwd = async () => {
    setError("");
    if (validator.allValid()) {
      setLoading(true);
      const allValues = {
        token:code,
        verificationId: verifyIds,
        value:email,
        type: "email",
      };
      const res = await middleForgetVerify(allValues);
    //   console.log(res, "respo");
      if (res?.data) {
        setLoading(false);
        navigate(`/reset-password`)
      } else {
        setLoading(false);
        setError(res.message);
      }
    } else {
      // setError("enter email feilds")
    }
  };

  console.log(validator,"validtor")

  const recoverPwd = async () => {
      setLoading(true);
      const allValues = {
        value: email,
        type: "email",
      };
      const res = await middleForget(allValues);
    //   console.log(res, "respo");
      if (res?.data && res?.message) {
        setVerifyId(res?.data.verificationId)
        setLoading(false);
        setMessage(res?.message)
      } else {
        setLoading(false);
        setError(res.message);
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
                          Enter your email verify Code 
                        </p>
                      </div>
                      <div className="text-center small error-red">{error}</div>
                      <div className="text-center small " style={{color:"greenyellow"}}>{message}</div>
                      <br />
                      <div className="row g-3 needs-validation" noValidate="">
                        <div className="col-12">
                          <label htmlFor="yourUsername" className="form-label">
                            Code
                          </label>
                            <input
                              type="text"
                              name="code"
                              value={code}
                              onChange={(e) => setCode(e.target.value)}
                              className="form-control"
                              required
                              onBlur={()=>validator.showMessageFor('code')}
                            />  
                            {validator.message("code",code,"required|numeric|min:0,num|size:6")}                       
                        </div>
                        <span className="small error-red">
                        {!validator.fields.code &&
                            validator.errorMessages.code}
                        </span>
                        <div className="col-12">
                          <label onClick={recoverPwd} htmlFor="remember-me-checkbox">
                          <Button  variant="link">
                            Resend Code 
                          </Button>
                          </label>
                        </div>
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
                              onClick={verifyPwd}
                            >
                              Verify Email
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
    </div>
  );
};

export default VerifyEmail;
