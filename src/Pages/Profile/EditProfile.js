import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePic } from "../../Services/Reducers/Slice";
import { editProfileApi } from "../../Middleware/Apis/Index";

const EditProfile = ({ data }) => {
  const inputValue = {
    name: "",
    email: "",
    phoneNo: "",
    about:"",
    address: "",
  };
  const [value, setValue] = useState(inputValue);
  const [errEmail, setErrEmail] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const inputRef = useRef();
  const triggerFileSelectPopup = () => inputRef.current.click();

  const { name, email, phoneNo,about, address } = value;

  const onChangeH = (e) => {
    const { name, value } = e.target;
    setValue((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    setValue(data);
  }, []);

  const updateAdminData = async (e) => {
    e.preventDefault();
    if(name&&email&&phoneNo&&address){
    const res = await editProfileApi(value);
    if (res.status == 200) {
      setMessage("Admin Data update Scussessfully");
      setValue("")
    } else if (res.status == 400) {
      if (res.message == "validation error") {
        setErrEmail("please Provide valid email");
      } else {
        setMessage(res.message);
      }
    } else {
      setMessage("Admin data not updateted");
    }}else{
      setMessage("fill  all medentry")
    }
  };

  setTimeout(() => {
    setMessage("");
    setErrEmail("")
  }, 3500);

  const { profilePic } = useSelector((state) => ({ ...state.admin }));

  const choosePic = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      var picture = event.target.files[0];
      const pPic = URL.createObjectURL(picture);
      dispatch(updatePic(pPic))
    }
  };

  const removePic = async () => {
    dispatch(updatePic("assets/img/default-Img.png"));
  };

  return (
    <div>
      <div>
        <span className="error" style={{ color: "green" }}>
          {message}
        </span>
        <div className="row mb-3">
          <label
            htmlFor="profileImage"
            className="col-md-4 col-lg-3 col-form-label"
          >
            Profile Image
          </label>
          <div className="col-md-8 col-lg-9">
            <img className="my-img" src={profilePic} alt="Profile" />
            <div className="text-center">
            </div>
            <div className="pt-3 ms-3">
              <input
                style={{ display: "none" }}
                type="file"
                ref={inputRef}
                accept="image/*"
                onChange={choosePic}
              />
              <button
                className="btn btn-primary btn-sm"
                title="Upload new profile image"
                onClick={triggerFileSelectPopup}
                style={{ marginInline: "3px" }}
              >
                <i className=" bi bi-upload" />
              </button>

              <button
                className="btn btn-danger btn-sm"
                title="Remove my profile image"
                onClick={removePic}
              >
                <i className="bi bi-trash" />
              </button>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <label
            htmlFor="fullName"
            className="col-md-4 col-lg-3 col-form-label"
          >
            Full Name
          </label>
          <div className="col-md-8 col-lg-9">
            <input
              name="name"
              type="text"
              className="form-control"
              id="fullName"
              value={name}
              onChange={onChangeH}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="company" className="col-md-4 col-lg-3 col-form-label">
            Email
          </label>
          <div className="col-md-8 col-lg-9">
            <input
              name="email"
              type="email"
              className="form-control"
              id="company"
              value={email}
              onChange={onChangeH}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="Address" className="col-md-4 col-lg-3 col-form-label">
            Address
          </label>
          <div className="col-md-8 col-lg-9">
            <input
              name="address"
              type="text"
              className="form-control"
              id="Address"
              value={address}
              onChange={onChangeH}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">
            Phone
          </label>
          <div className="col-md-8 col-lg-9">
            <input
              name="phoneNo"
              type="number"
              className="form-control"
              id="Phone"
              value={phoneNo}
              onChange={onChangeH}
            />
          </div>
        </div>{" "}
        <div className="text-center">
          <div className="feedback error-red">{errEmail}</div>
        </div>
        <br />
        <div className="text-center">
          <button onClick={updateAdminData} className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
