import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import React, { useContext, useState, useEffect } from "react";
import { globalContext } from "../context/globalContext";
import { api, typeHTTP } from "../utils/api";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import CheckIcon from "@mui/icons-material/Check";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AddGroup = ({ handleCloseModalAddGroup }) => {
  const [openModal, setOpenModal] = React.useState(false);
  const { data } = useContext(globalContext);
  const [result, setResult] = useState([]);
  const [phone, setPhone] = useState("");
  const [groupName, setGroupName] = useState("");
  const [participants, setParticipants] = useState([]);
  const [image, setImage] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [showIcon, setShowIcon] = useState(true);
  const handleOpenModal = (event) => {
    handleCloseModalAddGroup(event);
  };
  const handleSearch = () => {
    setResult([]);
    api({ url: "/user/find", method: typeHTTP.GET }).then((res) => {
      const arr = [];
      res.forEach((item) => {
        if (item.phone.includes(phone.toLowerCase())) {
          arr.push(item);
        }
      });
      setResult(arr);
    });
  };

  const handleFile = (e) => {
    const files = e.target.files;
    setImage(files[0]);
    const imageUrl = URL.createObjectURL(files[0]);
    // Lưu URL vào state hoặc props để hiển thị hình ảnh
    setImageUrl(imageUrl);
    setShowIcon(false);
  };
  useEffect(() => setParticipants([data.user]), [data.user]);

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleCreateGroup = () => {
    if (image) {
      const formData = new FormData();
      formData.append("name", groupName);
      formData.append("type", "group");
      formData.append("image", image);
      console.log("formData", formData);
      participants.forEach((item) => {
        formData.append("users", item._id);
      });
      api({
        url: "/room/create-group",
        method: typeHTTP.POST,
        body: formData,
      }).then((res) => {
        alert("Đăng ký nhóm thành công ");
      });
    }
  };
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "500px",
        height: "650px",
        bgcolor: "#fff",
        border: "1px solid #333",
        borderRadius: "6px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "10%",
        }}
      >
        <Typography sx={{ fontSize: "bold" }}>Tạo nhóm</Typography>
        <Button onClick={handleOpenModal}>
          <CloseIcon sx={{ color: "#333" }} />
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "10%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Button component="label" role={undefined}>
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              onChange={(e) => handleFile(e)}
            />
            <img
              src={imageUrl}
              style={{
                width: "46px",
                height: "46px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #3498db",
              }}
            />
            {showIcon && (
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <PhotoCameraBackIcon />
              </span>
            )}
          </Button>
          <TextField
            variant="filled"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            sx={{ width: "400px" }}
            placeholder="nhập tên nhóm"
          />
        </Box>
      </Box>

      <Box
        sx={{
          height: "70%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <TextField
            variant="filled"
            value={phone}
            sx={{ width: "480px" }}
            placeholder="nhập số điện thoại thành viên"
            onChange={(e) => setPhone(e.target.value)}
            onKeyDown={handleEnterPress}
          />
        
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "10px",
          }}
        >
          <Box
            sx={{
              width: "70%",
              maxHeight: "360px",
              overflowY: "auto",
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
            {result.map((user, index) => (
              <Box
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 4,
                  padding: "10px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <img
                    src={user?.image}
                    height={"40px"}
                    width={"40px"}
                    style={{ borderRadius: "50%",objectFit:"cover" }}
                  />
                  <Typography>{user?.username}</Typography>
                </Box>
                {participants.map((item) => item._id).includes(user._id) ? (
                  <RemoveCircleOutlineIcon
                    sx={{ color: "#3498db" }}
                    onClick={() => {
                      setParticipants(
                        participants.filter(
                          (participant) => participant._id !== user._id
                        )
                      );
                    }}
                  />
                ) : (
                  <AddCircleOutlineIcon
                    sx={{ color: "#3498db", border: "none" }}
                    onClick={() => setParticipants([...participants, user])}
                  />
                )}
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              width: "50%",
              border: "1px solid #b2bec3",
              maxHeight: "360px",
              overflowY: "auto",
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
            {participants.map((user, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  margin: "10px 0",
                  paddingLeft: "10px",
                }}
              >
                <img
                  src={user?.image}
                  height={"40px"}
                  width={"40px"}
                  style={{ borderRadius: "50%" ,objectFit:"cover"}}
                />
                <Typography variant="span">
                  {user?.username.length > 10
                    ? user?.username.substring(0, 10) + "..."
                    : user?.username}
                </Typography>
              </div>
            ))}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          height: "10%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <Button
          variant="text"
          sx={{ marginRight: "20px" }}
          onClick={handleOpenModal}
        >
          Hủy
        </Button>
        {participants.length >= 3 && groupName !== "" && image && (
          <Button variant="contained" onClick={() => handleCreateGroup()}>
            Tạo nhóm
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default AddGroup;
