import React, { useContext, useEffect, useState } from "react";
import { globalContext } from "../../context/globalContext";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { formatPhoneByFireBase } from "../../utils/call";
import { Box, Stack, Typography } from "@mui/material";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { api, typeHTTP } from "../../utils/api";
//import Login from "../Auth/Login";
import { useNavigate } from "react-router-dom";
const VerificationPage = () => {
  const { data } = useContext(globalContext);
  const [confirmation, setConfirmation] = useState();
  const [otp, setOtp] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const nav = useNavigate();

  // useEffect(() => {
  //   const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
  //   // formatPhoneByFireBase(data.user?.phone)
  //   signInWithPhoneNumber(
  //     auth,
  //     formatPhoneByFireBase(data.user?.phone),
  //     recaptcha
  //   )
  //     .then((confirmationResult) => {
  //       setConfirmation(confirmationResult);
  //     })
  //     .catch((error) => {
  //       console.error(" sendingError SMS:", error);
  //     });
  // }, [data.user]);

  useEffect(() => {
    if (data?.user?.phone) {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
      // console.log(formatPhoneByFireBase("phone", data.user.phone));
      signInWithPhoneNumber(
        auth,
        formatPhoneByFireBase(data.user.phone),
        recaptcha
      )
        .then((confirmationResult) => {
          setConfirmation(confirmationResult);
        })
        .catch((error) => {
          console.error(" sendingError SMS:", error);
        });
    }
  }, [data.user]);

  const handleSubmitOtp = () => {
    confirmation
      .confirm(otp)
      .then((userCredential) => {
        api({
          method: typeHTTP.POST,
          url: "/user/verification",
          body: { phone: data.user?.phone },
        }).then((res) => {
          setVerificationMessage("Đăng Ký Thành Công. Hãy Đăng Nhập Lại !");
          console.log(res);
          setAuthenticated(true);
          setTimeout(()=> {
            nav("/");
          }, 5000);
         
        });
      })
      .catch((error) => {
        console.error("Error confirming SMS code:", error);
        setVerificationMessage("Xác thực không thành công ");
        
      });
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
      <div id="recaptcha"></div>
      <Box
        sx={{
          height: "300px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "white",
        }}
      >
        <MarkEmailReadIcon sx={{ fontSize: "80px", color: "#3498db" }} />
        <Typography variant="span" sx={{ color: "#3498db" }}></Typography>
        <Box sx={{ marginTop: "20px" }}>
          <TextField
            sx={{ width: "300px", fontSize: "20px" }}
            label="Mã OTP"
            variant="outlined"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </Box>

        <Button
          variant="contained"
          sx={{ marginTop: "10px", width: "300px" }}
          onClick={() => {
            handleSubmitOtp();
          }}
        >
          Submit
        </Button>
        <Typography variant="span" sx={{ color: "red", marginTop: "10px" }}>
          {verificationMessage}
        </Typography>
        {/* {authenticated && (
          <Button
            variant="contained"
            onClick={() => (window.location.href = "/")}
          >
            Đăng Nhập
          </Button>
        )} */}
      </Box>
    </Stack>
  );
};

export default VerificationPage;
