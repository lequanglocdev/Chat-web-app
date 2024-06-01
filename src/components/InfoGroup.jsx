import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { getRemainUserForSingleRoom } from "~/utils/getRemainUserForSingleRoom";
import { globalContext } from "~/context/globalContext";
import { api, typeHTTP } from "../utils/api";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
const InfoGroup = ({ handleClose }) => {
  const { data, handler } = useContext(globalContext);
  const [room, setRoom] = useState();
  const [participants, setParticipants] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  useEffect(() => {
    setRoom(data?.currentRoom?._id);
    // console.log("mmm", data?.currentRoom?._id);
    setParticipants(data?.currentRoom?.users);
    // console.log("uuuuu", data?.currentRoom?.users);
  }, [data?.currentRoom?._id]);
  return (
    <Box
      sx={{
        width: "450px",
        minHeight: "500px",
        backgroundColor: "#fff",
        borderRadius: "8px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "14px",
        }}
      >
        <Typography>Thông tin tài khoản</Typography>
        <Button onClick={handleClose}>
          <CloseIcon />
        </Button>
      </Box>
      <Box>
        <img
          src="https://images.viblo.asia/0c004024-e96f-46a5-b42f-e98ad77fd095.jpg"
          style={{ width: "100%", objectFit: "cover", height: "200px" }}
        />
      </Box>
      <Box
        sx={{
          padding: "14px",
        }}
      >
        <Typography>Thành viên ({participants.length})</Typography>
        {participants.map((user, index) => {
          const isCreator = room?.creator === user._id;
          // const isDepute =(room?.depute || []).includes(user._id);
          return (
            <Box
              key={user._id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Tooltip
                  title={
                    participants.find((user) => user._id === selectedUserId)
                      ?.username
                  }
                >
                  <IconButton
                    size="small"
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <img
                      alt="user avatar"
                      src={
                        user?.image ||
                        "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                      }
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </IconButton>
                </Tooltip>
                <Box sx={{ width: "100%" }}>
                  <Box
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 6 }}>
                      <Typography>{user.username}</Typography>
                      {isCreator && (
                        <Typography
                          sx={{
                            color: "#fff",
                            backgroundColor: "#fdcb6e",
                            padding: "2px 6px",
                            borderRadius: "6px",
                          }}
                        >
                          Trưởng nhóm
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
              <MoreHorizIcon
                sx={{ cursor: "pointer" }}
                // onClick={handleClickMenu}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default InfoGroup;
