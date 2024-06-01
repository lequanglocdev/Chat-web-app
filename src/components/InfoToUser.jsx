import { Alert, Box, Button, Typography } from "@mui/material";
import React, { useEffect, useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { getRemainUserForSingleRoom } from "~/utils/getRemainUserForSingleRoom";

import { globalContext } from "~/context/globalContext";
import { api, typeHTTP } from "../utils/api";

const InfoToUser = ({ handleClose }) => {
  const { data, handler } = useContext(globalContext);

  // Chuyển đổi ngày sinh sang định dạng ngày tháng năm
  const formatBirthday = (birthday) => {
    const date = new Date(birthday);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month < 10 ? "0" + month : month}/${year}`;
  };
  const hidePhoneNumber = (phone) => {
    return phone.replace(/\d(?=\d{3})/g, "*");
  };
  const handleUnFriend = (toUser) => {
    const body = {
      fromUser: data.user,
      toUser,
      room_id: data.currentRoom._id,
    };

    api({
      body: body,
      url: "/user/unfriend",
      method: typeHTTP.POST,
    })
      .then((res) => {
        handler.setUser(res)
        handler.setCurrentRoom(null)
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
          src={
            getRemainUserForSingleRoom(data.currentRoom, data.user?._id)?.image
          }
          style={{ width: "100%", objectFit: "cover", height: "200px" }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Button onClick={handleClose}>
          <Typography>Gọi điện</Typography>
        </Button>
        <Button onClick={handleClose}>
          <Typography>Nhắn tin</Typography>
        </Button>
      </Box>
      <Box sx={{ padding: "14px" }}>
        <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
          Thông tin cá nhân
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            marginTop: "10px",
          }}
        >
          <Box>
            <Typography>Họ Tên</Typography>
            <Typography>Giới tính</Typography>
            <Typography>Ngày sinh</Typography>
            <Typography>Điện thoại</Typography>
          </Box>
          <Box>
            <Typography>
              {
                getRemainUserForSingleRoom(data.currentRoom, data.user?._id)
                  ?.username
              }
            </Typography>
            <Typography>
              {
                getRemainUserForSingleRoom(data.currentRoom, data.user?._id)
                  ?.gender
              }
            </Typography>
            <Typography>
              {formatBirthday(
                getRemainUserForSingleRoom(data.currentRoom, data.user?._id)
                  ?.birthday
              )}
            </Typography>
            <Typography>
              {hidePhoneNumber(
                getRemainUserForSingleRoom(data.currentRoom, data.user?._id)
                  ?.phone
              )}
            </Typography>
          </Box>
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
        onClick={() =>
          handleUnFriend(
            getRemainUserForSingleRoom(data.currentRoom, data.user?._id)
          )
        }
      >
        <Button>
          <Typography sx={{ textAlign: "center", color: "#fff" }}>
            Xóa bạn
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default InfoToUser;
