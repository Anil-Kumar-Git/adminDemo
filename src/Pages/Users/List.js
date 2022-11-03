import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserAlert from "../../Components/Alerts/successAlert";
import Spiner from "../../Components/Spiners/Spiner";
import ConfirmModel from "../../Components/models/confirmModel";
import { getData } from "../../Services/Reducers/Users";
import AddUserModel from "../../Components/models/AddUserModel";
import { Table } from "react-bootstrap";
import EditUserModel from "../../Components/models/EditUser";
import { getApi, searchApi } from "../../Middleware/Apis/Index";
import { toast } from "react-toastify";

const List = () => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState([]);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("primary");
  const [search, setSearch] = useState(null);
  const [singleData, setSingleData] = useState({ name: "anil", _id: "1" });

  const { newUser, deleteUser, updateUser } = useSelector((state) => ({
    ...state.usersData,
  }));

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 2000);
  }, [message]);

  const getData = async () => {
    setLoading(true);
    let result = await getApi();
    if (result.status == 200) {
      toast.success(result.message,{position:"top-center"})
      if (result.data.length > 0) {
        setLoading(false);
        setState(result.data);
      } else {
        toast.warn("now not any data of users",{position:"top-left"})
      }
    } else if (result.status == 400) {
      toast.warn("data not found",{position:"top-left"})
     
    } else {
      toast.error("server Error",{position:"top-left"})
   
    }
  };

  useEffect(() => {
    searchApiD();
  }, [search]);

  const searchApiD = async () => {
    let result = await searchApi(search);
    if (search) {
      if (result.data.length > 0) {
        setState(result.data);
      } else {
        setState(result.data);
        toast.warn("User not mached",{position:"top-left"})
      }
    } else {
      let result = await getApi();
      setLoading(true);
      if (result.status == 200) {
        if (result.data.length > 0) {
          setLoading(false);
          setState(result.data);
        }
      }
    }
  };

  const deleteHandle = async (id) => {
    state.map((data) => {
      if (id == data._id) {
        setSingleData(data);
      }
    });
    if (deleteUser.status == 200) {
      setMessage(deleteUser.message);
      setColor("warning");
    }
    let result = await getApi();
    setLoading(true);
    if (result.status == 200) {
      if (result.data.length > 0) {
        setLoading(false);
        setState(result.data);
      }
    }
  };

  const editHandle = async (id) => {
    state.map((data) => {
      if (id == data._id) {
        setSingleData(data);
      }
    });
    if (updateUser.status == 200) {
      setMessage(updateUser.message);
      setColor("success");
    }
    let result = await getApi();
    setLoading(true);
    if (result.status == 200) {
      if (result.data.length > 0) {
        setLoading(false);
        setState(result.data);
      }
    }
  };

  useEffect(() => {
    addNewUser();
  }, [newUser]);

  const addNewUser = async () => {
    if (newUser.status == 200) {
      setMessage(newUser.message);
      setColor("success");
    }
    let result = await getApi();
    setLoading(true);
    if (result.status == 200) {
      if (result.data.length > 0) {
        setLoading(false);
        setState(result.data);
      }
    }
  };

  // useEffect(() => {
  //   searchHandler();
  // }, [search]);

  // const pageDataHandle = async (id, result) => {
  //   const responce = await fetch(`${Url}/user/getUserWithpagination/1/`, {
  //     method: "get",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   const newresult = await responce.json();
  //   console.log(newresult);
  // };

  return (
    <div className="background-dark">
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Users List</h1>
        </div>
        {message ? <UserAlert message={message} color={color} /> : ""}
        {/* End Page Title */}
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  {/* Table with stripped rows */}
                  <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                    <div className="dataTable-top">
                      <button
                        className="btn btn-primary rounded-pill"
                        data-bs-toggle="modal"
                        data-bs-target="#newStaticBackdrop"
                      >
                        Add User
                      </button>
                      <div className="dataTable-search">
                        <input
                          className="dataTable-input"
                          placeholder="Search..."
                          type="text"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="dataTable-container">
                      <Table className="table datatable dataTable-table">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              data-sortable=""
                              style={{ width: "7.45161%" }}
                            >
                              <a className="dataTable-sorter">#</a>
                            </th>
                            <th
                              scope="col"
                              data-sortable=""
                              style={{ width: "15.5269%" }}
                            >
                              <a className="dataTable-sorter">Name</a>
                            </th>
                            <th
                              scope="col"
                              data-sortable=""
                              style={{ width: "15.914%" }}
                            >
                              <a className="dataTable-sorter">Email</a>
                            </th>
                            <th
                              scope="col"
                              data-sortable=""
                              style={{ width: "15.7527%" }}
                            >
                              <a className="dataTable-sorter">PhoneNumber</a>
                            </th>
                            <th
                              scope="col"
                              data-sortable=""
                              style={{ width: "19.3548%" }}
                            >
                              <a className="dataTable-sorter">Adddress</a>
                            </th>
                            <th
                              scope="col"
                              data-sortable=""
                              style={{ width: "19.3548%" }}
                              colSpan={2}
                            >
                              <a className="dataTable-sorter">Action</a>
                            </th>
                          </tr>
                        </thead>
                        {loading ? (
                          <Spiner />
                        ) : (
                          <tbody>
                              {state &&
                                state.map((item, index) => {
                                  return (
                                    <tr key={item._id}>
                                      <td>{index + 1}</td>
                                      <td>{item.name}</td>
                                      <td>{item.email}</td>
                                      <td>{item.phoneNo}</td>
                                      <td>{item.address}</td>
                                      <td>
                                        <button
                                          className="btn btn-danger rounded-pill"
                                          data-bs-toggle="modal"
                                          data-bs-target="#staticBackdrop"
                                          onClick={() => deleteHandle(item._id)}
                                        >
                                          <i className="ri-delete-bin-5-line" />
                                        </button>{" "}
                                        <button
                                          data-bs-toggle="modal"
                                          data-bs-target="#newEditStaticBackdrop"
                                          className="btn btn-info rounded-pill"
                                          onClick={() => editHandle(item._id)}
                                        >
                                          <i className="ri-edit-2-line" />
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })}
                          </tbody>
                        )}
                      </Table>
                    </div>

                    <div className="dataTable-bottom"></div>
                  </div>
                  {/* End Table with stripped rows */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ConfirmModel value={singleData} />
      <AddUserModel />
      <EditUserModel editValue={singleData} />
    </div>
  );
};

export default List;
