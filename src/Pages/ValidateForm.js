import React, { useState } from "react";
import { validator } from "../Middleware/Validation";
import app from "../Config/firebase_config";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { ToastContainer , toast } from "react-toastify";


const ValidateForm = () => {
  const inputValue = {
    name: "",
    email: "",
    contact: "",
    address: "",
    password: "",
    Cpassword: "",
    otp: "",
    agree:false
  };

  const [value, setValue] = useState(inputValue);
  const [show, setShow] = useState(false);

  const { name, email, contact, address, password, Cpassword, otp ,agree} = value;

  const auth = getAuth(app);


  const onCaptchaVerify = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
        },
      },
      auth
    );
  };

  const onSignInSubmit = () => {
    onCaptchaVerify();
    const phoneNumber = "+91" + contact;
    const appVerifier = window.recaptchaVerifier;
    console.log(phoneNumber, appVerifier, "nbbbbbbbb");
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        alert("otp sended");

        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        alert("SMS not sent");
        // ...
      });
  };

  const veryfyUser = () => {
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(user);
        alert("User signed in successfully.");
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        alert("User couldn't sign in ");
        // ...
      });
  };

  const onChangeH = (e) => {
    
    const { name, value ,checked } = e.target;
    console.log(name,value,checked)
    if(name!="agree"){
      setValue((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }else{
      setValue((prevData) => ({
        ...prevData,
        [name]: checked
      }));
    }
  };

  const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve(name), 5000))
  const submitForm =async () => {
    if (validator.allValid()) {
      toast.success("validate form is done") 
      const phoneNo=contact
      // let result = await fetch(
      //   `http://localhost:3000/user/validUser`,
      //   {
      //     method: "post",
      //     body: JSON.stringify({ name, email, address, phoneNo, password,agree}),
      //     headers: {
      //       Accept: "application/json",
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      // let newresult = await result.json();
      // console.log("hello rescult" ,newresult)
      return false
      // if (newresult.success === true) {
      //   alert("inserted successfully");
      //   navigate("/list");
      // } else {
      //   let error = newresult.errors;
      //   if (error.email && error.password) {
      //     const errEmailA = newresult.errors.email.message;
      //     setErrEmail(errEmailA);
      //   } else if (error.email) {
      //     const errEmailA = newresult.errors.email.message;
      //     setErrEmail(errEmailA);
      //   }else{
      //     setErrEmail("")
      //   }
      // }
    } else {
      setShow(true);
      toast.promise(
        resolveAfter3Sec,
        {
          pending: 'Promise is pending',
          success: {
            render({data}){
            return `hello ${data}`
          }},
          error: 'Promise rejected 🤯'
        })
      // toast.warn("fill a valid form")
      console.log(value)
    }
  };

  return (
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Contact</h1>
        </div>
      
        <div id="recaptcha-container"></div>
        <section className="section contact">
          <div className="row gy-4">
            <div className="col-xl-12">
              <div className="card p-4">
                <div
                  action="forms/contact.php"
                  method="post"
                  className="php-email-form"
                >
                  <div className="row gy-4">
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Your Name"
                        value={name}
                        onChange={onChangeH}
                      />
                      {validator.message("name", name, "required|string")}
                      <span className="feedback error-red">
                        {show && validator.errorMessages.name}
                      </span>
                    </div>
                    <div className="col-md-6 ">
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        placeholder="Your Email"
                        value={email}
                        onChange={onChangeH}
                      />
                      {validator.message("email", email, "required|email")}
                      <span className="feedback error-red">
                        {show && validator.errorMessages.email}
                      </span>
                    </div>
                    <div className="col-md-6 ">
                      <input
                        type="number"
                        className="form-control"
                        name="contact"
                        placeholder="Your contact"
                        required=""
                        value={contact}
                        onChange={onChangeH}
                      />
                      <button
                        onClick={onSignInSubmit}
                        type="button"
                        value="verify"
                      >
                        verify
                      </button>
                      {validator.message("contact", contact, "required|phone")}
                      <span className="feedback error-red">
                        {show && validator.errorMessages.contact}
                      </span>
                    </div>
                    <div className="col-md-6 ">
                      <input
                        type="number"
                        className="form-control"
                        name="otp"
                        placeholder="enter otp"
                        value={otp}
                        onChange={onChangeH}
                      />
                      <button onClick={veryfyUser} type="button" value="verify">
                        verify
                      </button>
                    </div>
                    <div className="col-md-6 ">
                      <input
                        type="address"
                        className="form-control"
                        name="address"
                        placeholder="Your Address"
                        value={address}
                        onChange={onChangeH}
                      />
                    </div>
                    <div className="col-md-6 ">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Your password"
                        value={password}
                        onChange={onChangeH}
                      />
                      {validator.message(
                        "password",
                        password,
                        "required|digSpePassword|upLoPassword|minEtPassword"
                      )}
                      <span className="feedback error-red">
                        {show && validator.errorMessages.password}
                      </span>
                    </div>
                    <div className="col-md-6 ">
                      <input
                        type="password"
                        className="form-control"
                        name="Cpassword"
                        placeholder="Your confirm password"
                        value={Cpassword}
                        onChange={onChangeH}
                      />
                      {password != Cpassword
                        ? validator.message(
                            "Cpassword",
                            Cpassword,
                            "required|ConfirmPassword"
                          )
                        : validator.message("Cpassword", Cpassword, "required")}

                      <span className="feedback error-red">
                        {show && validator.errorMessages.Cpassword}
                      </span>
                    </div>
                    <div className="col-md-6 ">
                    <input type="checkbox" id="agreeId" name="agree" onChange={onChangeH} value={agree}/>
                    <label for="vehicle3"> agree t & C</label>
                    </div>

                    <div className="col-md-12 text-center">
                      <button  type="submit" onClick={submitForm}>
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ValidateForm;
