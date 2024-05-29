import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import InputForm from "../../components/InputForm";
import ButtonComponents from "../../components/Button";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { api, typeHTTP } from "../../utils/api";
import { globalContext } from "../../context/globalContext";
import { Stack } from "@mui/material";
import Alert from "@mui/material/Alert";
const Login = () => {
  const nav = useNavigate();
  const { data, handler } = useContext(globalContext);
  const [loading, setLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const handleClose = () => {
    setLoading(false);
  };
  const [login, setlogin] = useState({
    phone: "",
    password: "",
  });
  const [invalidFiels, setInvalidFiels] = useState([]);

  //xử lý đăng nhập tài khoản
  const loginUser = async () => {
    let invalids = validate(login);
    if (invalids) {
      setLoading(true);
      const body = {
        phone: login.phone,
        password: login.password,
      };
      try {
        const res = await api({
          method: typeHTTP.POST,
          url: "/auth/login",
          body,
        });
        localStorage.setItem("user", JSON.stringify(res._id));
        const accessToken = res.accessToken;
        localStorage.setItem("accessToken", accessToken);
        console.log("Token Login", res.accessToken);
        handler.setUser(res);
        setLoading(false);
        nav("/home");
      } catch (error) {
        setLoading(false);
        console.error("Login failed:", error);
        // Hiển thị thông báo lỗi cho người dùng
        alert(
          "Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin đăng nhập."
        );
      }
    }
  };

  // xử lý ràng buộc dữ liệu
  const validate = (login) => {
    let invalids = 0;
    let fields = Object.entries(login);
    fields.forEach((item) => {
      if (item[1] === "")
        setInvalidFiels((prev) => [
          ...prev,
          {
            name: item[0],
            message: "Bạn không được bỏ trống trường này",
          },
        ]);
      invalids++;
    });
    fields.forEach((item) => {
      switch (item[0]) {
        case "password":
          if (item[1].length < 6) {
            setInvalidFiels((prev) => [
              ...prev,
              {
                name: item[0],
                message: "Mật khẩu phải có tối thiểu 6 ký tự",
              },
            ]);
            invalids++;
          }
          break;
        case "phone":
          if (!+item[1] || item[1].length < 9 || item[1].length > 10) {
            setInvalidFiels((prev) => [
              ...prev,
              {
                name: item[0],
                message: "Số điện thoại không hợp lệ",
              },
            ]);
            invalids++;
          }
          break;
        default:
          break;
      }
    });
    return invalids;
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      loginUser();
    }
  };
  const ClickRegister = () => {
    nav("/register");
  };
  const ClickForgetPassword = () => {
    nav("/forgetpassword");
  };
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Stack
        sx={{
          backgroundColor: "#b3e0ff",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h3"
            style={{ color: "#00a8ff", fontWeight: 500 }}
          >
            Zalo
          </Typography>
          <Typography variant="span">
            Đăng nhập tài khoản Zalo <br />
            để kết nối với ứng dụng Zalo Web
          </Typography>
        </Box>

        <Box
          style={{
            width: "400px",
            minHeight: "300px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#ffffff",
            marginTop: "15px",
          }}
        >
          <InputForm
            label={"số điện thoại"}
            value={login.phone}
            setValue={setlogin}
            type={"phone"}
            name="phone"
            setInvalidFiels={setInvalidFiels}
            onKeyPress={handleKeyPress}
            invalidFiels={invalidFiels}
          />
          <InputForm
            label={"mật khẩu"}
            value={login.password}
            setValue={setlogin}
            type={"password"}
            name="password"
            setInvalidFiels={setInvalidFiels}
            onKeyPress={handleKeyPress}
            invalidFiels={invalidFiels}
          />

          <ButtonComponents text={"Đăng nhập"} onClick={()=> loginUser()} />
          <Box
            style={{
              marginTop: "20px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="span"
              style={{
                marginLeft: "6px",
                color: "#3498db",
                cursor: "pointer",
              }}
              onClick={ClickForgetPassword}
            >
              Quên mật khẩu
            </Typography>

            <Typography variant="span" style={{ marginTop: "10px" }}>
              Bạn chưa có tài khoản?
              <Typography
                variant="span"
                style={{
                  marginLeft: "6px",
                  color: "#3498db",
                  cursor: "pointer",
                }}
                onClick={ClickRegister}
              >
                Đăng ký
              </Typography>
              <Typography
                variant="span"
                style={{
                  marginLeft: "6px",
                  color: "#3498db",
                  cursor: "pointer",
                }}
              ></Typography>
            </Typography>
          </Box>
        </Box>
      </Stack>
    </>
  );
};

export default Login;
