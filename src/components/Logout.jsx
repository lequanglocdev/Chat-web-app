import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  border: "1px solid #333",
  borderRadius: "6px",
};
const Logout = ({ handleCloseModalLogout }) => {
  const nav = useNavigate();
  const handleOpenModal = (event) => {
    handleCloseModalLogout(event);
  };
  const LogoutUser = () => {
    const loguot = localStorage.removeItem("user"); 
    nav("/");
    console.log("Log out",loguot );
  };
 
  return (
    <div>
      <Box sx={style}>
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography id="modal-modal-description">Xác nhận</Typography>
          <Button onClick={handleOpenModal}>
            <CloseIcon sx={{ color: "#333" }} />
          </Button>
        </Box>
        <Divider />
        <Box>
          <Typography id="modal-modal-description" sx={{ p: 2 }}>
            Bạn có muốn đăng xuất khỏi zalo ?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleOpenModal} sx={{ cursor: "pointer" }}>
              Không
            </Button>
            <Button variant="contained" sx={{ m: 2 }} onClick={LogoutUser}>
              Đăng xuất
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Logout;
