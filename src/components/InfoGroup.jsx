import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

import { globalContext } from "~/context/globalContext";
import { api, typeHTTP } from "../utils/api";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import Member from "./Member";

const InfoGroup = ({ handleClose }) => {
  const { data, handler } = useContext(globalContext);
  const [room, setRoom] = useState();
  const [participants, setParticipants] = useState([]);
  const [openMember, setOpenMember] = useState(false);
  const handleOpenMember = () => setOpenMember(true);
  const handleCloseMember = () => setOpenMember(false);

  useEffect(() => {
    setRoom(data?.currentRoom?._id);
    setParticipants(data?.currentRoom?.users);
  }, [data?.currentRoom?._id]);

  const handleLeaveGroup = () => {
    const body = {
      room_id: data.currentRoom._id,
      user_id: data.user._id,
    };
    api({ body, method: typeHTTP.POST, url: "/room/leave" }).then((res) => {
      handler.setRooms(data.rooms.filter((item) => item._id !== res._id));
      handler.setCurrentRoom(null);
    });
  };
  const handleDisBandRoom = () => {
    if (data.currentRoom.type === "group") {
      const id = data.currentRoom._id;
      api({ method: typeHTTP.DELETE, url: `/room/${id}` }).then((res) => {
        api({
          method: typeHTTP.GET,
          url: `/room/get-by-user/${data.user?._id}`,
        }).then((rooms) => {
          handler.setRooms(rooms);
          handler.setCurrentRoom(null);
        });
      });
    }
  };
  return (
    <Box
      sx={{
        width: "450px",
        minHeight: "420px",
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
        <Typography>Thông tin nhóm</Typography>
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {data?.currentRoom?.users.map((user, index) => (
            <span key={index}>
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
            </span>
          ))}
          <Button onClick={handleOpenMember}>
            <MoreHorizIcon />
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          backgroundColor: "#e74c3c",
          borderRadius: "4px",
          height: "30px",
          cursor: "pointer",
        }}
        onClick={handleLeaveGroup}
      >
        <Button>
          <Typography sx={{ textAlign: "center", color: "#fff" }}>
            Rời nhóm
          </Typography>
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          backgroundColor: "#3498db",
          borderRadius: "4px",
          height: "30px",
          cursor: "pointer",
          marginTop: "20px",
        }}
        onClick={handleDisBandRoom}
      >
        <Button>
          <Typography sx={{ textAlign: "center", color: "#fff" }}>
            Xóa nhóm
          </Typography>
        </Button>
      </Box>

      <Modal open={openMember} onClose={handleCloseMember}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
            padding: "14px",
          }}
        >
          <Member handleCloseMember={handleCloseMember} />
        </Box>
      </Modal>
    </Box>
  );
};

export default InfoGroup;
