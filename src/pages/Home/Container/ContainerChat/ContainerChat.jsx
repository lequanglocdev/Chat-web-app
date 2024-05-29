import React, { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import HeadingChat from "./HeadingChat";
import BodyChat from "./BodyChat";
import { globalContext } from "../../../../context/globalContext";
import { api, typeHTTP } from "../../../../utils/api";

const ContainerChat = () => {
  return (
    <Box>
      <HeadingChat />
      <BodyChat />
    </Box>
  );
};

export default ContainerChat;
