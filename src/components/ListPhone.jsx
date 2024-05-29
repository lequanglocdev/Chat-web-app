import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DraftsIcon from "@mui/icons-material/Drafts";
import Typography from "@mui/material/Typography";
import Search from "~/components/Search";
import React, { useState } from "react";
import Badge from "@mui/material/Badge";
const ListPhone = ({ onSelect, friendRequests }) => {
  const [activeTab, setActiveTab] = useState("friends");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onSelect(tab); // Gọi hàm onSelect để truyền trạng thái xuống component cha
  };
  return (
    <Box
      sx={{
        width: (theme) => theme.zalo.asideChatWidth,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #dfe6e9",
      }}
    >
      <Search sx={{ height: (theme) => theme.zalo.heightSearch }} />

      <Box sx={{ height: (theme) => theme.zalo.heightList }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "0 18px",
            height: "56px",
            cursor: "pointer",
            backgroundColor:
              activeTab === "friends" ? "#74b9ff" : "transparent", // Thay đổi màu nền khi mục được chọn
          }}
          onClick={() => handleTabClick("friends")}
        >
          <PersonIcon />
          <Typography sx={{ marginLeft: "20px" }}>Danh sách bạn bè</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "0 18px",
            height: "56px",
            cursor: "pointer",
            backgroundColor: activeTab === "groups" ? "#74b9ff" : "transparent",
          }}
          onClick={() => handleTabClick("groups")}
        >
          <PeopleAltIcon />
          <Typography sx={{ marginLeft: "20px" }}>Danh sách nhóm</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "0 18px",
            height: "56px",
            cursor: "pointer",
            backgroundColor:
              activeTab === "invitations" ? "#74b9ff" : "transparent",
          }}
          onClick={() => handleTabClick("invitations")}
        >
          {/* <Badge badgeContent={1} color="primary">
            <DraftsIcon />
          </Badge> */}
          <DraftsIcon />
          <Typography sx={{ marginLeft: "20px" }}>Lời mời kết bạn</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ListPhone;
