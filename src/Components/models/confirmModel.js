import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { deleteApi } from "../../Middleware/Apis/Index";
import { useDispatch } from "react-redux";
import { deleteData } from "../../Services/Reducers/Users";

const ConfirmModel = ({ value }) => {
  const dispatch=useDispatch()
  const [err,setErr]=useState("")
  
  const deletehandle=async()=>{
    const id = value._id;
     const res=await deleteApi(id)
     if(res.status==200){
      dispatch(deleteData(res))
     }else if(res.status==400){
         setErr(res.message)
     }else{
       setErr(res.message)
     }
  }

  return (
    <div>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header">
            <h5 className="card-title text-center pb-0 fs-4">Delete User</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <div className="feedback error-red">{err}</div>
              <h3>Are You sure Delete</h3>
              <h4 style={{color:"red"}}>{value.name}</h4>
            </div>
            <div className="modal-fosingleDataoter" style={{display:"flex" ,flexDirection:"row-reverse" ,marginRight:15}}>
              <Button type="button" className="btn btn-secondary " data-bs-dismiss="modal">
                Close
              </Button>
              <Button
                style={{marginRight:15 , background:"red"}}
                type="button"
                data-bs-dismiss="modal"
                onClick={deletehandle}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModel;
