import React, { useEffect, useState } from "react";
import ChangePassword from "./ChangePassword";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
import { getSingleApi } from "../../Middleware/Apis/Index";

const MyProfile = () => {
  const [page, setPage] = useState(false);
  const [data,setData]=useState("")
  const [message,setMessage]=useState("")
  const About=""
  
  const {profilePic}=useSelector((state)=>({...state.admin}))

  useEffect(()=>{
    oneUser()
  },[])

  const oneUser = async () => {
     const res=await getSingleApi()
     if(res.status==200){
      setData(res.data)
 }else{
      setMessage("Admin data not found")
 }
}

  const pageEdit = () => {
    setPage(true);
  };

  return (
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Profile</h1>

        </div>
        <span className="error-red">{message}</span>
        {/* End Page Title */}
        <section className="section profile">
          <div className="row">
            <div className="col-xl-4">
              <div className="card">
                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="rounded-circle"
                  />
                  <h2>{data.name}</h2>
                  <h3>{data.role}</h3>
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="card">
                <div className="card-body pt-3">
                  {/* Bordered Tabs */}
                  <ul className="nav nav-tabs nav-tabs-bordered">
                    <li className="nav-item">
                      <button
                        className="nav-link active"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-overview"
                      >
                        Overview
                      </button>
                    </li>

                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-edit"
                        onClick={pageEdit}
                      >
                        Edit Profile
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-change-password"
                        onClick={pageEdit}
                      >
                        Change Password
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content pt-2">
                    <div
                      className="tab-pane fade profile-overview active show"
                      id="profile-overview"
                    >
                      <h5 className="card-title">About</h5>
                      <p className="small fst-italic">
                        Sunt est soluta temporibus accusantium neque nam maiores
                        cumque temporibus. Tempora libero non est unde veniam
                        est qui dolor. Ut sunt iure rerum quae quisquam autem
                        eveniet perspiciatis odit. Fuga sequi sed ea saepe at
                        unde.
                      </p>
                      <h5 className="card-title">Profile Details</h5>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label ">
                          Full Name
                        </div>
                        <div className="col-lg-9 col-md-8">{data.name}</div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Job/Role</div>
                        <div className="col-lg-9 col-md-8">
                          Web Designer / {data.role}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Address</div>
                        <div className="col-lg-9 col-md-8">{data.address}</div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">
                          Phone Number
                        </div>
                        <div className="col-lg-9 col-md-8">{data.phoneNo}</div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Email</div>
                        <div className="col-lg-9 col-md-8">{data.email}</div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">
                          Created Date
                        </div>
                        <div className="col-lg-9 col-md-8">
                          {data.createdAt}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">
                          Updated Date
                        </div>
                        <div className="col-lg-9 col-md-8">
                          {data.updatedAt}
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade profile-edit pt-3"
                      id="profile-edit"
                    >
                      {/* Profile Edit Form */}
                      {page ? <EditProfile data={data} /> : ""}
                      {/* End Profile Edit Form */}
                    </div>
             
                    <div
                      className="tab-pane fade pt-3"
                      id="profile-change-password"
                    >
                      {/* Change Password Form */}
                      {page ? <ChangePassword /> : ""}
                      {/* End Change Password Form */}
                    </div>
                  </div>
                  {/* End Bordered Tabs */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MyProfile;
