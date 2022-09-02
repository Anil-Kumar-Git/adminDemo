import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "./Layouts/Main/Layout";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard/Main";
import Error from "./Pages/Users/Error";
import Footer from "./Layouts/Footer/Footer";
import ProtectedComponent from "./Routes/protectedRoutes";
import PrivetComponent from "./Routes/privetRoute";
import ResetPwd from "./Pages/ResetPwd"
import List from "./Pages/Users/List";
import MyProfile from "./Pages/Profile/MyProfile";
import ContactUsers from "./Pages/Users/ContactUsers";

function App() {
  const [login, setLogin] = useState(false);
  const showLayout = (event) => {
    setLogin(event);
  };

  return (
    <div>
      <BrowserRouter>
        {login ? "" : <Layout />}
        <div className="background-dark">
          <Routes>
            <Route element={<ProtectedComponent auth={showLayout} />}>
              <Route path="/login" element={<Login />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPwd/>}
              />
            </Route>
            <Route element={<PrivetComponent auth={showLayout} />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/list" element={<List />} />
              <Route path="/myprofile" element={<MyProfile />} />
              <Route path="/user-contact/" element={<ContactUsers />} /> 
            </Route>
            <Route path="/*" element={<Error />} />
          </Routes>
        </div>
        {login ? "" : <Footer />}
      </BrowserRouter>
    </div>
  );
}

export default App;
