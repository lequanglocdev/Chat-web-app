import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { globalContext } from "~/context/globalContext";
import { api, typeHTTP } from "../utils/api";
const Member = () => {
  const { data, handler } = useContext(globalContext);
  return (
    <Box
      sx={{
        width: "450px",
        minHeight: "420px",
        backgroundColor: "#fff",
        borderRadius: "8px",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "14px",
        }}
      >
        <Typography>Thông tin thành viên nhóm</Typography>
        <Button>
          <CloseIcon />
        </Button>
      </Box>
      <Box
        sx={{
          marginLeft: "14px",
          maxHeight: "410px",
          overflow: "auto",

          gap: 2,
          cursor: "pointer",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ccc",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#ccc",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#ddd",
            borderRadius: "8px",
          },
        }}
      >
        {data?.currentRoom?.users.map((user, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              marginTop: "10px",
            }}
          >
            <img
              alt={user?.username}
              src={user?.image}
              style={{
                display: "inline-block",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <Typography>{user?.username}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Member;
