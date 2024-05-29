import Home from "./pages/Home/Home";
import { Route, Routes, useLocation } from "react-router-dom";

import { GlobalContext, globalContext } from "./context/globalContext";
import VerificationPage from "./pages/Auth/verificationPage";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
// import Addfriend from "./pages/Default/addfriend";
import { useContext, useEffect } from "react";
import { api, typeHTTP } from "./utils/api";

import ForgetPassword from "./pages/Auth/ForgetPassword";

import Info from "./components/Info";

function App() {
  const location = useLocation();
  const { pathname } = location;
  const { data, handler } = useContext(globalContext);

  // useEffect(() => {
  //   const id = JSON.parse(localStorage.getItem("user"));
  //   console.log(id);
  //   api({ url: `/user/find/${id}`, method: typeHTTP.GET }).then((res) => {
  //     console.log(res);
  //     handler.setUser(res);
  //   });
  // }, [pathname]);
  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("user"));
    api({ url: `/user/find/${id}`, method: typeHTTP.GET }).then((res) => {
      handler.setUser(res);
    });
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verification" element={<VerificationPage />} />
      <Route path="/forgetpassword" element={<ForgetPassword />} />
      <Route path="/home" element={<Home />}>
        <Route path="info" element={<Info />} />
      </Route>
    </Routes>
  );
}

export default App;
