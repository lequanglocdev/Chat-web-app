import React from "react";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";

const HeadingPhone = () => {
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
        <PersonIcon />
        <Typography sx={{ marginLeft: "20px" }}>Danh sách bạn bè</Typography>
      </Box>
    </Box>
  );
};

export default HeadingPhone;
