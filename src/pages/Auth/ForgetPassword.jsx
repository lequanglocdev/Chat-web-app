import React, { useState, useContext } from "react";
import { api, typeHTTP } from "../../utils/api";
import { globalContext } from "../../context/globalContext";
import { Box, Stack, TextField, Typography } from "@mui/material";
import InputForm from "../../components/InputForm";
import ButtonComponents from "../../components/Button";

const ForgetPassword = () => {
  const [sendmail, setSendmail] = useState("");
  const { data, handler } = useContext(globalContext);

  const handleForgetPassword = async () => {
    const body = {
      email: sendmail,
    };
    console.log(body);
    try {
      const res = await api({
        method: typeHTTP.POST,
        url: "/auth/forgetPassword",
        body: body,
      });
      handler.setUser(res);
      console.log("dau ra sendmail", res);
    } catch (error) {
      console.error("Login failed:", error);
    }
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
          Quên mật khẩu Zalo <br />
          để kết nối với ứng dụng Zalo Web
        </Typography>
      </Box>
      <Box
        sx={{
          width: "400px",
          minHeight: "140px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffff",
          marginTop: "15px",
        }}
      >
        <TextField
          fullWidth
          placeholder="nhập email của bạn"
          value={sendmail.email}
          onChange={(e) => setSendmail(e.target.value)}
        />
        <ButtonComponents text={"Gửi email"} onClick={handleForgetPassword} />
      </Box>
    </Stack>
  );
};

export default ForgetPassword;
