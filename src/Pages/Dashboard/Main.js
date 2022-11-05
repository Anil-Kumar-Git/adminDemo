import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = () => {
 const state=useSelector((state)=>state)
 console.log("state",state)
  return (
    <div className="background-dark">
      {/* main start */}
      <main id="main" className="main">
        {/*Dashboard icon start*/}
        <div className="pagetitle">
          <h1>Dashboard</h1>
        </div>
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                {/* End Logo */}

              
              </div>
            </div>
          </div>
        </section>
        {/* Dashboard icon end  */}

        {/* fully page cover */}

        {/*end fully page cover */}
      </main>
      {/* main end */}
    </div>
  );
};

export default Dashboard;
