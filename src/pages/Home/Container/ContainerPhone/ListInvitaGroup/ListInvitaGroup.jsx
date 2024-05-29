import React from "react";
import Box from "@mui/material/Box";

import HeadingInvitaPhone from "./HeadingInvitaPhone";
import BodyInvitaPhone from "./BodyInvitaPhone";

const ListInvitaGroup = () => {
  return (
    <Box sx={{ width: "1020px" }}>
      <HeadingInvitaPhone />
      <BodyInvitaPhone/>
    </Box>
  );
};

export default ListInvitaGroup;
