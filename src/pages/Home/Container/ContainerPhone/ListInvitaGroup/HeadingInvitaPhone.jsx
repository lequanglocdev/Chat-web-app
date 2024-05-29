import React from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
const HeadingInvitaPhone = () => {
  return (
    <Box
      sx={{
        borderBottom: "1px solid #b2bec3",
        width: "100%",
        height: "64px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "0 18px",
          cursor: "pointer",
          borderRadius: "8px",
        }}
      >
        <MailOutlineIcon />
        <Typography sx={{ marginLeft: "20px" }}>Lời mời kết bạn</Typography>
      </Box>
    </Box>
  );
};

export default HeadingInvitaPhone;
