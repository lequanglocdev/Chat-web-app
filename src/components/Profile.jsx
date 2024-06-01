import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import Info from "./Info";
import Logout from "./Logout";
import { globalContext } from "../context/globalContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Profile = () => {
  const { data } = useContext(globalContext); 
  const username = data.user?.username;
  const avatar = data.user?.image;


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenModal(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = (event) => {
    event.stopPropagation();
    setOpenModal(false);
  };

  const [openModalLogout, setOpenModalLogout] = React.useState(false);
  const handleOpenModalLogout = () => setOpenModalLogout(true);
  const handleCloseModalLogout = (event) => {
    event.stopPropagation();
    setOpenModalLogout(false);
  };

  return (
    <Box>
      <Tooltip>
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            sx={{ width: 40, height: 40 }}
            src={avatar}
          ></Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu-profile"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button-profile",
        }}
        sx={{
          "& .MuiMenu-paper": {
            width: 300,
          },
          "& .MuiMenu-root": {
            position: "absolute",
            top: 0,
          },
        }}
      >
        <Box sx={{ width: 300 }}>
          <MenuItem onClick={handleClose}>
            <Typography sx={{ fontWeight: "bold" }}>{username}</Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleOpenModal}>
            Hồ sơ của bạn
            <Modal open={openModal} onClose={handleCloseModal}>
              <Info handleCloseModal={handleCloseModal} />
            </Modal>
          </MenuItem>

          <MenuItem onClick={handleOpenModalLogout}>
            Đăng xuất
            <Modal open={openModalLogout} onClose={handleCloseModalLogout}>
              <Logout handleCloseModalLogout={handleCloseModalLogout} />
            </Modal>
          </MenuItem>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
