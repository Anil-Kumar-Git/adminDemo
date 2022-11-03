import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Url } from "../Middleware/BaseUrl";
import { Spinner, Button } from "react-bootstrap";
import PasswordModel from "../Components/models/PasswordModel";
import { loginApi } from "../Middleware/Apis/Index";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginDone, setLoginDone] = useState(false);
  
  const userLogin = async () => {
    let item = { email, password };
    if (email && password) {
      let result = await loginApi(item)
      const data = result.data;
      if (result.success == true) {
        if (data.role === "admin") {
          setLoginDone(true);
          let name = result.data.name;
          let token = result.token;
          const adminId = result.data._id;
          navigate("/");
          // alert(`welcome ${name} `);
          localStorage.setItem("token", token);
          localStorage.setItem("adminId", adminId);
        } else {
          setError(
            "* only admin can access this page"
          );
        }
      } else {
        setError("* " + result.message);
      }
    } else {
      setError("please fill all fields");
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
                        <h5 className="card-title text-center pb-0 fs-4">
                          Login to Your Account
                        </h5>
                        <p className="text-center small">
                          Enter your email &amp; password to login
                        </p>
                      </div>
                      <div className="text-center small error-red">{error}</div>
                      <br />
                      <div className="row g-3 needs-validation" noValidate="">
                        <div className="col-12">
                          <label htmlFor="yourUsername" className="form-label">
                            Email
                          </label>
                          <div className="input-group has-validation">
                            <input
                              type="text"
                              name="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="form-control"
                              id="yourUsername"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <label htmlFor="yourPassword" className="form-label">
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="yourPassword"
                            required
                          />
                        </div>

                        <div className="col-12">
                          {loginDone? (
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
                            <button
                              className="btn btn-primary w-100"
                              type="submit"
                              onClick={userLogin}
                            >
                              Login
                            </button>
                          )}
                        </div>

                        <PasswordModel/>
                        <div className="col-12">
                          <p className="small mb-0">
                            Lost your Password ?{" "}
                            <Button variant="link" data-bs-toggle="modal"
                                 data-bs-target="#staticBackdrop"
                            >forgot password</Button>
                          </p>
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

export default Login;
