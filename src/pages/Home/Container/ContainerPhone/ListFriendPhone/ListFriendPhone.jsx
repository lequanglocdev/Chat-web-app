import React from "react";
import Box from "@mui/material/Box";
import HeadingPhone from "./HeadingPhone";
import BodyPhone from "./BodyPhone";

const ListFriendPhone = () => {
  return (
    <Box sx={{ width: "1020px" }}>
      <HeadingPhone />
      <BodyPhone />
    </Box>
  );
};

export default ListFriendPhone;
