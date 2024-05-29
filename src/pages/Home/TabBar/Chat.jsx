import Box from "@mui/material/Box";
import React, { useContext, useEffect } from "react";
import Search from "../../../components/Search";
import Divider from "@mui/material/Divider";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chat from "../../../components/Chat";
import BodyChat from "../Container/ContainerChat/BodyChat";
import ContainerChat from "../Container/ContainerChat/ContainerChat";
import { globalContext } from "../../../context/globalContext";
import Grid from "@mui/material/Grid";
import WellCome from "../../../components/WellCome";

const ChatHome = () => {
  const { data, handler } = useContext(globalContext);

  return (
    <Grid container sx={{ height: "100vh", borderRight: "1px solid #dfe6e9", borderRadius: "4px" }}>
      {/* Left Section */}
      <Grid item xs={12} sm={4} md={3} lg={3} xl={2}>
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <Search />
          <Divider />
          <Box sx={{ flexGrow: 1 }}>
            <Chat />
          </Box>
        </Box>
      </Grid>

      {/* Right Section */}
      <Grid item xs={12} sm={8} md={9} lg={9} xl={10}>
        <Box sx={{ height: "100%" }}>
          {data.currentRoom ? (
            <Box sx={{ width: "100%", height: "100%" }}>
              <Box className="header" sx={{ width: "100%", height: "10%" }}>
                {/* {`Tro chuyen voi ${
                  getRemainUserForSingleRoom(data.currentRoom, data.user?._id)
                    .username
                }`} */}
                <ContainerChat />
              </Box>
            </Box>
          ) : (
            <WellCome />
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ChatHome;
