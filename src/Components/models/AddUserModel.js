import { Button } from "react-bootstrap";
import React, { useEffect, useState,useRef } from "react";
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addApi } from "../../Middleware/Apis/Index";
import { addData } from "../../Services/Reducers/Users";

const AddUserModel = () => {
  const closeMe = useRef();
    const dispatch=useDispatch()
  const inputValue = {
    name: "",
    email: "",
    phoneNo: "",
    address: "",
  };
  const [value, setValue] = useState(inputValue);
  const [show, setShow] = useState(null);
  const [errEmail, setErrEmail] = useState("");

  const { name, email, phoneNo, address } = value;

  const navigate = useNavigate();

  const onChangeH = (e) => {
    const { name, value } = e.target;

    setValue((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(()=>{
    setTimeout(() => {
      setErrEmail("")
    },2000);
  })

  const submitHandler = async (e) => {
    e.preventDefault();
    if(name&&phoneNo&&address){
      let res=await addApi(value)
      if(res.status==200){
        closeMe.current.click();
       dispatch(addData(res))
       setValue(inputValue)
      }else if(res.status==400){
        if(res.message=="validation error"){
          setErrEmail("enter valid email")
        }else{
          setErrEmail(res.message)
        }
      }else{
        setErrEmail(res.message)
      }
    }else{
      setErrEmail("* all mendetory")
    }
  };

  return (
    <div>
      <div
        className="modal fade"
        id="newStaticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                class="btn-close"
                ref={closeMe}
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row ">
              <div className="feedback error-red">{errEmail}</div>
                <div className="col-12 margin-top">
                  <label htmlFor="yourName" className="form-label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="form-control"
                    value={name}
                    onChange={onChangeH}
                  />
                </div>
                <div className="col-12 margin-top">
                  <label htmlFor="yourEmail" className="form-label">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="form-control"
                    value={email}
                    onChange={onChangeH}
                  />
                  
                </div>
                <div className="col-12 margin-top">
                  <label htmlFor="yourEmail" className="form-label">
                    Your Adddress
                  </label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    value={address}
                    onChange={onChangeH}
                    required=""
                  />
            
                </div>

                <div className="col-12 margin-top">
                  <label htmlFor="yourName" className="form-label">
                    PhoneNo
                  </label>
                  <input
                    type="number"
                    name="phoneNo"
                    className="form-control"
                    value={phoneNo}
                    onChange={onChangeH}
                    required=""
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <Button
                onClick={submitHandler}
                className="btn btn-primary w-100"
                type="submit"
              >
                Add User
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserModel;
