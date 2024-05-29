import React from "react";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import GroupsIcon from "@mui/icons-material/Groups";
const HeadingGroupPhone = () => {
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
        <GroupsIcon />
        <Typography sx={{ marginLeft: "20px" }}>
          Danh sách nhóm và cộng đồng
        </Typography>
      </Box>
    </Box>
  );
};

export default HeadingGroupPhone;
