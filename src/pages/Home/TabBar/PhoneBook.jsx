import Box from "@mui/material/Box";
import ListPhone from "../../../components/ListPhone";
import ListFriendPhone from "../Container/ContainerPhone/ListFriendPhone/ListFriendPhone";
import React, { useState } from "react";
import ListFriendGroup from "../Container/ContainerPhone/ListFriendGroup/ListFriendGroup";
import ListInvitaGroup from "../Container/ContainerPhone/ListInvitaGroup/ListInvitaGroup";
const PhoneBook = () => {
  const [selectedTab, setSelectedTab] = useState("friends");
  const handleTabSelect = (tab) => {
    setSelectedTab(tab); // Cập nhật trạng thái khi người dùng chọn tab từ ListPhone
  };
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",

        alignItems: "center",
      }}
    >
      <Box sx={{}}>
        <ListPhone onSelect={handleTabSelect} />
      </Box>
      <Box sx={{}}>
        {/* <ListFriendPhone /> */}
        {selectedTab === "friends" && <ListFriendPhone />}
        {selectedTab === "groups" && <ListFriendGroup />}
        {selectedTab === "invitations" && <ListInvitaGroup />}
      </Box>
    </Box>
  );
};

export default PhoneBook;
