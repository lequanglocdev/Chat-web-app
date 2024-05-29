import React, { useContext } from "react";
import { Container as MuiContainer } from "@mui/material";
import TabBar from "./TabBar/TabBar";

import { useState } from "react";
import { globalContext } from "../../context/globalContext";
import { Outlet } from "react-router-dom";
const Home = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(1);

  return (
    <MuiContainer
      disableGutters
      maxWidth={false}
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <TabBar
        selectedTabIndex={selectedTabIndex}
        onTabChange={(index) => setSelectedTabIndex(index)}
      />
      <Outlet/>
    </MuiContainer>
  );
};

export default Home;
