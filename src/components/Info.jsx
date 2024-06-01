import React, { useContext, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { globalContext } from "../context/globalContext";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";
import { api, typeHTTP } from "../utils/api";
import { styled } from "@mui/material/styles";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
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

const Info = () => {
  const { data, handler } = useContext(globalContext); 
  const username = data.user?.username;
  const phone = data.user?.phone;
  const gender = data.user?.gender;
  const image1 = data.user?.image;
  const birthday = new Date(data.user?.birthday).toLocaleDateString("vi-VN");

  const [openModal, setOpenModal] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newGender, setNewGender] = useState("");
  const [newDay, setNewDay] = useState("");
  const [newMonth, setNewMonth] = useState("");
  const [newYear, setNewYear] = useState("");
  const [image, setImage] = useState([]);
  const [imageUrl, setImageUrl] = useState(image1);

  const updateUser = async () => {
    const body = {
      username: newUsername || username,
      gender: newGender || gender,
      birthday: `${newDay || new Date(birthday).getDate()}/${
        newMonth || new Date(birthday).getMonth() + 1
      }/${newYear || new Date(birthday).getFullYear()}`,
      image: image || image1,
    };
    console.log("Dau vao:", body);
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.log("Access token is missing");
      return;
    }
    try {
      const res = await api({
        method: typeHTTP.POST,
        url: "/user/update",
        body: body,
        sendToken: true,
      });
      if (res.error) {
        console.error("API Error:", res.error);
        return;
      }
      handler.setUser(res);
      console.log("dau ra update", res);
      handleCloseModal1();
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleFile = async (e) => {
    try {
      const files = e.target.files;
      setImage(files[0]);
      const imageUrl = URL.createObjectURL(files[0]);
      setImageUrl(imageUrl);

      // Nếu có tệp được chọn
      if (files[0]) {
        const formData = new FormData();
        formData.append("image", files[0]);
        console.log("formData", formData);

        // Lấy token từ local storage
        const token = localStorage.getItem("accessToken");
        if (!token) {
          // Nếu không có token, hiển thị thông báo lỗi và thoát khỏi hàm
          console.log("Access token is missing");
          return;
        }

        // Gửi token trong tiêu đề và gửi dữ liệu hình ảnh đến API
        try {
          const res = await api({
            url: `/user/updateAvatar/${data.user?._id}`,
            method: typeHTTP.POST,
            body: formData,
            sendToken: true,
          });
          //console.log("Response from API:", res);
          console.log("Upload ảnh thành công ");
        } catch (error) {
          // Xử lý lỗi nếu gặp phải khi gọi API
          console.error("Error uploading image:", error);
        }
      }
    } catch (error) {
      // Xử lý lỗi nếu có lỗi khi chọn hình ảnh
      console.error("Error picking images:", error);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#fff",
    border: "1px solid #333",
    borderRadius: "6px",
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    window.location.href = "/home";
  };
  const handleCloseModal1 = () => {
    setOpenModal(false);
  };

  const handleUpdateProFiles = () => {
    handleOpenModal();
  };
  return (
    <div>
      <Box sx={style}>
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            id="modal-modal-description"
            sx={{ fontWeight: "bold", fontSize: "18px" }}
          >
            Thông tin tài khoản
          </Typography>
          <Button onClick={handleCloseModal}>
            <CloseIcon sx={{ color: "#333" }} />
          </Button>
        </Box>
        <Box>
          <CardMedia
            sx={{ height: 140, objectFit: "cover" }}
            image="https://images.pexels.com/photos/17841163/pexels-photo-17841163/free-photo-of-thien-nhien-chim-bay-d-ng-v-t-an-th-t.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            title="green iguana"
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: 40,
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src={imageUrl || image1}
              sx={{
                width: 70,
                height: 70,
                position: "relative",
                top: "-6px",
                right: "-30px",
              }}
            />
            <Button
              component="label"
              role={undefined}
              sx={{ width: "5px", paddingRight: "40px", m: 0 }}
            >
              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                onChange={handleFile}
              />

              <PhotoCameraIcon sx={{ marginTop: "30px" }} />
            </Button>
            <Typography
              id="modal-modal-description"
              sx={{ fontSize: "20px", fontWeight: "bold" }}
            >
              {username}
              <BorderColorIcon
                sx={{ fontSize: "15px", marginLeft: "10px", cursor: "pointer" }}
              />
            </Typography>
          </Box>
          <Box sx={{ m: 2, marginTop: "30px" }}>
            <hr />
            <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
              Thông tin cá nhân
            </Typography>

            <Typography
              sx={{ fontSize: "16px", color: "#4d4d4d", marginTop: "20px" }}
            >
              Giới tính &emsp;&emsp;&emsp;&emsp;{gender}
            </Typography>
            <Typography
              sx={{ fontSize: "16px", color: "#4d4d4d", marginTop: "10px" }}
            >
              Ngày sinh &emsp;&emsp;&emsp;{birthday}
            </Typography>
            <Typography
              sx={{ fontSize: "16px", color: "#4d4d4d", marginTop: "10px" }}
            >
              Điện thoại &emsp;&emsp;&emsp;{phone}
            </Typography>
            <Typography
              sx={{ fontSize: "12px", color: "#4d4d4d", marginTop: "20px" }}
            >
              Chỉ có bạn bè của bạn đã được kết bạn mới thấy được số điện thoại
              này
            </Typography>
          </Box>
          <hr />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
           

            <Button
              sx={{
                fontSize: "20px",
                color: "black",
                fontWeight: "bold",
                marginTop: "2px",
              }}
              onClick={handleUpdateProFiles}
              startIcon={
                <BorderColorIcon sx={{ fontSize: "15px", cursor: "pointer" }} />
              }
            >
              Cập nhật
            </Button>
            <Modal open={openModal} onClose={handleCloseModal}>
              <div>
                <Box sx={style}>
                  <Box
                    sx={{
                      p: 2,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
                      <Button onClick={handleCloseModal1}>
                        <ArrowBackIcon sx={{ color: "#333" }}></ArrowBackIcon>
                      </Button>
                      Câp nhập thông tin
                    </Typography>
                    <Button onClick={handleCloseModal}>
                      <CloseIcon sx={{ color: "#333" }} />
                    </Button>
                  </Box>
                  <hr />
                  <Box sx={{ marginLeft: "20px" }}>
                    <Typography sx={{ fontSize: "17px" }}>
                      Tên hiển thị
                    </Typography>
                    <Input
                      type={"username"}
                      name="username"
                      placeholder={username}
                      label={"Tên"}
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      sx={{ margin: "5px", width: "340px", height: "50px" }}
                    ></Input>
                    <Typography sx={{ fontWeight: "bold", fontSize: "17px" }}>
                      Thông tin cá nhân
                    </Typography>
                    <Box sx={{ marginTop: "20px" }}>
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="Nam"
                          checked={newGender === "Nam"}
                          onChange={() => setNewGender("Nam")}
                        />
                        Nam
                      </label>
                      <label>
                        <input
                          style={{ marginLeft: "50px" }}
                          type="radio"
                          name="gender"
                          value="Nữ"
                          checked={newGender === "Nữ"}
                          onChange={() => setNewGender("Nữ")}
                        />
                        Nữ
                      </label>
                    </Box>
                    <Typography sx={{ fontSize: "17px", marginTop: "20px" }}>
                      Ngày sinh
                    </Typography>
                    <Box display="flex">
                      <FormControl sx={{ m: 1, width: "100px" }}>
                        <InputLabel id="month-label">Ngày</InputLabel>
                        <Select
                          labelId="month-label"
                          value={newMonth}
                          onChange={(e) => setNewMonth(e.target.value)}
                        >
                          {Array.from({ length: 31 }, (_, i) => i + 1).map(
                            (m) => (
                              <MenuItem key={m} value={m}>
                                {m}
                              </MenuItem>
                            )
                          )}
                        </Select>
                      </FormControl>
                      <FormControl sx={{ m: 1, width: "100px" }}>
                        <InputLabel id="day-label">Tháng</InputLabel>
                        <Select
                          labelId="day-label"
                          value={newDay}
                          onChange={(e) => setNewDay(e.target.value)}
                        >
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(
                            (d) => (
                              <MenuItem key={d} value={d}>
                                {d}
                              </MenuItem>
                            )
                          )}
                        </Select>
                      </FormControl>
                      <FormControl sx={{ m: 1, width: "100px" }}>
                        <InputLabel id="year-label">Năm</InputLabel>
                        <Select
                          labelId="year-label"
                          value={newYear}
                          onChange={(e) => setNewYear(e.target.value)}
                        >
                          {Array.from(
                            { length: new Date().getFullYear() - 1899 },
                            (_, i) => new Date().getFullYear() - i
                          ).map((y) => (
                            <MenuItem key={y} value={y}>
                              {y}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                  <br /> <br /> <br /> <br /> <br />
                  <hr />
                  <Box
                    display="flex"
                    flexDirection={"row-reverse"}
                    margin={"15px"}
                  >
                    <Button
                      sx={{
                        width: "100px",
                        height: "40px",
                        backgroundColor: "#80ccff",
                        color: "black",
                        fontSize: "18px",
                        marginLeft: "5px",
                        fontWeight: "bold",
                      }}
                      onClick={updateUser}
                    >
                      Cập Nhật
                    </Button>

                    <Button
                      sx={{
                        width: "67px",
                        height: "40px",
                        backgroundColor: "#e6e6e6",
                        color: "black",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      Hủy
                    </Button>
                  </Box>
                </Box>
              </div>
            </Modal>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Info;
