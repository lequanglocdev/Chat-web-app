import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
const WellCome = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="p">Chào mừng bạn đến với zalo web</Typography>
      <Typography variant="p">
        Khám phá những tiện ích hỗ trợ làm việc và trò chuyện cùng <br /> người
        thân, bạn bè được tối ưu hóa cho máy tính của bạn
      </Typography>
      <img
        width={700}
        height={400}
        src="https://res.cloudinary.com/dhyt592i7/image/upload/v1709905546/fgupqdntogv2amuxzqxx.png"
        alt=""
      />
      <Typography variant="p">
        Đồng Hành Cùng Cộng Đồng, Đơn Giản, Dễ Sử Dụng
      </Typography>
    </Box>
  );
};

export default WellCome;
