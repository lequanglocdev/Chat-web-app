import React, { useContext, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { globalContext } from "../../../../../context/globalContext";
import { api, typeHTTP } from "../../../../../utils/api";

const BodyInvitaPhone = () => {
  const { data, handler } = useContext(globalContext);
  const [friendRequests, setFriendRequests] = useState([]);
  const [acceptStatus, setAcceptStatus] = useState({
    open: false,
    message: "",
  });

  useEffect(() => {
    api({
      url: `/user/friend-requests/${data.user?._id}`,
      method: typeHTTP.GET,
    }).then((res) => {
      console.log(res);
      setFriendRequests(res);
    });
  }, [data.user]);

  const handleAccept = async (toUser) => {
    api({
      url: `/user/find/${toUser.friendId}`,
      method: typeHTTP.GET,
    }).then((toUserResult) => {
      const body = {
        fromUser: data.user,
        toUser: toUserResult,
      };
      api({
        body: body,
        url: "/user/accept-request",
        method: typeHTTP.POST,
      })
        .then((res) => {
          handler.setUser(res);
        })
        .catch((error) => {
          console.error("Error accepting friend request:", error);
        });
    });
  };

  const handleRefuse = async (toUser) => {
    api({
      url: `/user/find/${toUser.friendId}`,
      method: typeHTTP.GET,
    }).then((toUserResult) => {
      const body = {
        fromUser: data.user,
        toUser: toUserResult,
      };
      api({
        body: body,
        url: "/user/refuse-request",
        method: typeHTTP.POST,
      })
        .then((res) => {
          handler.setUser(res);
        })
        .catch((error) => {
          console.error("Error refusing friend request:", error);
        });
    });
  };

  const handleCloseSnackbar = () => {
    setAcceptStatus({ ...acceptStatus, open: false });
  };

  return (
    <Box
      sx={{
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        overflowY: "auto",
        height: "calc(100vh - 64px)",
      }}
    >
      {friendRequests && friendRequests.length > 0 ? (
        friendRequests.map((request, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #ccc",
              padding: "8px 0",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 4,
               
              }}
            >
              <img
                src={request?.image}
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <Typography>{request?.username}</Typography>
            </Box>
            <Box sx={{display:"flex",gap:4}}>
              <Button variant="contained" onClick={() => handleAccept(request)}>
                Chấp nhận
              </Button>
              <Button variant="contained" onClick={() => handleRefuse(request)}>
                Từ chối
              </Button>
            </Box>
          </Box>
        ))
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography sx={{ color: "#b2bec3", margin: "20px" }}>
            Bạn không có lời mời kết bạn nào.
          </Typography>
        </Box>
      )}
      <Snackbar
        open={acceptStatus.open}
        message={acceptStatus.message}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
};

export default BodyInvitaPhone;
