import React, { useContext, useEffect, useState } from "react";
import { api, typeHTTP, baseURLOrigin } from "../utils/api";
import { globalContext } from "../context/globalContext";
import { getRemainUserForSingleRoom } from "../utils/getRemainUserForSingleRoom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { io } from "socket.io-client";
const socket = io.connect(baseURLOrigin);
const Chat = () => {
  const { data, handler } = useContext(globalContext);
  const [messages, setMessages] = useState([]);
  const [lastMessages, setLastMessages] = useState({});

  useEffect(() => {
    api({
      url: `/room/get-by-user/${data.user?._id}`,
      method: typeHTTP.GET,
    }).then((res) => {
      handler.setRooms(res);
    });
  }, [data.user]);
  return (
    <Box
      sx={{
        width: "100%",
        height: "60px",
        borderRadius: 1,
        borderRight: "1px solid #ccc", // Updated from "1px so"
      }}
    >
      <Box>
        <Typography
          variant="subtitle2"
          sx={{ color: "#3498db", fontSize: "14px", fontWeight: 600 }}
          p={2}
        >
          Tin nhắn của {data.user?.username}
          {/* <img src={data.user?.image}/> */}
        </Typography>
      </Box>
      <Box>
        {data.rooms.map((room, index) => {
          const otherUser = getRemainUserForSingleRoom(room, data.user?._id);
          const lastMessage = lastMessages[room._id];
          return (
            <Box
              onClick={() => handler.setCurrentRoom(room)}
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "6px",
                gap: 5,
                cursor: "pointer",
              }}
            >
              <img
                alt={otherUser?.username}
                src={
                  room.type === "single"
                    ? otherUser?.image ||
                      "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                    : room.type === "group"
                    ? room?.image ||
                      "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                    : "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                }
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="span"
                  sx={{ fontSize: "14px", fontWeight: "bold" }}
                >
                  {room.type === "single"
                    ? otherUser?.username
                    : room.name.length > 30
                    ? `${room.name.substring(0, 30)}...`
                    : room.name}
                </Typography>
                <Typography sx={{ fontSize: "12px" }}>
                  {lastMessage ? lastMessage?.information : "No messages yet"}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Chat;
