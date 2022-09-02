import React, { useState } from "react";
import { Url } from "../../Middleware/BaseUrl";
import { Link, useNavigate } from "react-router-dom";

const PasswordModel = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(true);

  const recoverPwd = async () => {
    if (email) {
      let responce = await fetch(`${Url}/user/forgot`, {
        method: "post",
        body: JSON.stringify({ email }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      let result = await responce.json();
      console.log(result);
      if (result.status == 200) {
        setShow(false);
      } else {
        setError("* only admin can access this page");
      }
    } else {
      setError("fill this filled");
    }
  };

  const inputChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  return (
    <div>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="card-title text-center pb-0 fs-4">
                {show ? "Forgot" : "Reset"} your password?
              </h5>

              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p className="text-center small">
                {show ? (
                  <p>
                    {" "}
                    Don't fret! Just type in your email and we will send you a
                    code to reset your password!
                  </p>
                ) : (
                  <p>
                    Check your email for a link to reset your password. If it
                    doesn’t appear within a few minutes, check your spam folder.
                  </p>
                )}
              </p>
              <div className="text-center small error-red">{error}</div>
              <div className="row g-3 needs-validation" noValidate="">
                {show ? (
                  <div className="col-12">
                    <label htmlFor="yourUsername" className="form-label">
                      Your Email
                    </label>
                    <div className="input-group has-validation">
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={inputChange}
                        className="form-control"
                        id="yourEmail"
                        required
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="modal-footer">
              {show ? (
                <button
                  className="btn btn-primary w-100"
                  type="submit"
                  onClick={recoverPwd}
                >
                  Recover password
                </button>
              ) : (
                <button
                  data-bs-toggle="modal"
                  className="btn btn-primary w-100"
                  onClick={()=>{setShow(true)}}
                >
                  <Link to="/login" style={{color:"white"}}>Back To Login</Link>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordModel;
