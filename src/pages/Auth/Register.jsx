import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import { Navigate, useNavigate } from "react-router-dom";
import InputForm from "../../components/InputForm";
import ButtonComponents from "../../components/Button";
import Typography from "@mui/material/Typography";

import { api, typeHTTP } from "../../utils/api";
import { globalContext } from "../../context/globalContext";
import { Stack } from "@mui/material";

const Register = () => {
  const nav = useNavigate();
  const { data, handler } = useContext(globalContext);
  // xử lý ràng buộc dữ liệu

  const [register, setRegister] = useState({
    username: "",
    phone: "",
    password: "",
    email: "",
  });
  const [invalidFiels, setInvalidFiels] = useState([]);

  const registerUser = async () => {
    let invalids = validate(register);
    if (invalids) {
      const body = {
        username: register.username,
        email: register.email,
        phone: register.phone,
        password: register.password,
      };
      api({ method: typeHTTP.POST, url: "/auth/register", body }).then(
        (res) => {
          handler.setUser(res);
          console.log("register", res);
          nav("/verification");
        }
      );
    }
  };
  const validate = (register) => {
    let invalids = 0;
    let fields = Object.entries(register);
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
  return (
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
        <Typography variant="h3" style={{ color: "#00a8ff", fontWeight: 500 }}>
          Zalo
        </Typography>
        <Typography variant="span">
          Đăng ký tài khoản Zalo <br />
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
          label={"Tên"}
          value={register.username}
          setValue={setRegister}
          type={"username"}
          name="username"
          setInvalidFiels={setInvalidFiels}
          invalidFiels={invalidFiels}
        />
        <InputForm
          label={"số điện thoại"}
          value={register.phone}
          setValue={setRegister}
          type={"phone"}
          name="phone"
          setInvalidFiels={setInvalidFiels}
          invalidFiels={invalidFiels}
        />
        <InputForm
          label={"mật khẩu"}
          value={register.password}
          setValue={setRegister}
          type={"password"}
          name="password"
          setInvalidFiels={setInvalidFiels}
          invalidFiels={invalidFiels}
        />
        <InputForm
          label={"email"}
          value={register.email}
          setValue={setRegister}
          type={"email"}
          name="email"
          setInvalidFiels={setInvalidFiels}
          invalidFiels={invalidFiels}
        />
        <ButtonComponents text={"Đăng ký"} onClick={registerUser} />
        <Box
          style={{
            padding: "10px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
          }}
        ></Box>
      </Box>
    </Stack>
  );
};

export default Register;
