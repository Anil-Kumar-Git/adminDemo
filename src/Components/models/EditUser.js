import React, { useEffect, useState,useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { editApi } from "../../Middleware/Apis/Index";
import { editData } from "../../Services/Reducers/Users";

const EditUserModel = ({editValue}) => {
      const closeMe = useRef();
    const dispatch=useDispatch();
    const navigate = useNavigate();
    
  
    const inputValue = {
      name: "",
      email: "",
      phoneNo: "",
      address: "",
    };
    const [value, setValue] = useState(inputValue);

    useEffect(()=>{
      setValue(editValue);
    },[editValue])

    const [errEmail, setErrEmail] = useState("");
    const [err,setErr]=useState("")
    const { name, email, phoneNo, address } = value;
  
    useEffect(()=>{
      setTimeout(() => {
        setErrEmail("")
        setErr('')
      },2000);
    })
  
  
    const onChangeH = (e) => {
      const { name, value } = e.target;
      setValue((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };  
  
    const updateHandler =async () => {
      if(name&&phoneNo&&address&&email){
        let res=await editApi(value)
        if(res.status==200){
          closeMe.current.click();
         dispatch(editData(res))
        }else if(res.status==400){
          if(res.message=="validation error"){
            setErrEmail("enter valid email")
          }else{
            setErr(res.message)
          }
        }else{
          setErr(res.message)
        }
      }else{
        setErr("* all mendetory")
      }
    }

  return (
    <div>
      <div
        className="modal fade"
        id="newEditStaticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header">
             
                <h5 className="card-title text-center pb-0 fs-4">Edit User</h5>
           
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
            <div className="feedback error-red">{err}</div>
              <div className="row ">
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
                  <div className="feedback error-red">{errEmail}</div>
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
            <div className="modal-footer" style={{flexWrap:"nowrap"}}>
              <Button
                data-bs-dismiss="modal"
                ref={closeMe}
                className="btn btn-secondary df w-50"
                type="submit"
              >
                Cancel
              </Button>
              <Button
                onClick={updateHandler}
                className="btn btn-primary w-50"
                type="submit"
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserModel;
