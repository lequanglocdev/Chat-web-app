import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import React, { useContext, useState } from "react";
import { globalContext } from "../context/globalContext";
import { api, typeHTTP } from "../utils/api";

const AddFriend = ({ handleCloseModalAddFriend }) => {
  const [phone, setPhone] = useState("");
  const [results, setResults] = useState([]);
  const { data, setData } = useContext(globalContext);
  const [error, setError] = useState(false);

  const handleOpenModal = (event) => {
    handleCloseModalAddFriend(event);
  };

  const handleSearch = () => {
    if (phone.trim() !== "" && phone.length >= 9 && phone.length <= 10) {
      setResults([]);
      api({ url: `/user/find?phone=${phone}`, method: typeHTTP.GET }).then(
        (res) => {
          const filteredResults = res.filter((item) =>
            item.phone.includes(phone)
          );
          setResults(filteredResults);
          setError(filteredResults.length === 0);
        }
      );
    } else {
      setError(true);
    }
  };

  const handleSendRequestAddFriend = (toUser) => {
    const body = {
      fromUser: data.user,
      toUser,
    };
    setResults((prevResults) =>
      prevResults.map((result) =>
        result._id === toUser._id ? { ...result, status: "pending" } : result
      )
    );
    api({
      body: body,
      url: "/user/send-request-add-friend",
      method: typeHTTP.POST,
    }).then((res) => {
      if (res.success) {
        setData((prevData) => {
          const updatedFriends = [
            ...prevData.user.friends,
            { friendId: toUser._id, status: "pending" },
          ];
          return {
            ...prevData,
            user: {
              ...prevData.user,
              friends: updatedFriends,
            },
          };
        });
      }
    });
  };

  const checkRelationship = (otherUser) => {
    const friend = data.user.friends.find(
      (item) => item.friendId === otherUser._id
    );
    if (friend) {
      if (friend.status === "pending") {
        return <Button disabled>Đã gửi lời mời kết bạn</Button>;
      } else {
        return (
          <Button variant="contained" disabled>
            Bạn bè
          </Button>
        );
      }
    } else if (otherUser.status === "pending") {
      return <Button disabled>Đã gửi lời mời kết bạn</Button>;
    } else {
      return (
        <Button
          variant="contained"
          onClick={() => handleSendRequestAddFriend(otherUser)}
        >
          Gửi lời mời kết bạn
        </Button>
      );
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "490px",
        height: "600px",
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
        <Typography>Thêm bạn</Typography>
        <Button onClick={handleOpenModal}>
          <CloseIcon sx={{ color: "#333" }} />
        </Button>
      </Box>
      <Box
        sx={{
          marginTop: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "10%",
        }}
      >
        <Typography>Nhập số điện thoại</Typography>
        <TextField
          error={error}
          variant="filled"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </Box>
      <Box
        sx={{ height: "70%", backgroundColor: "#dfe6e9", marginTop: "20px" }}
      >
        <Typography sx={{ color: "#0984e3" }}>Danh sách tìm bạn bè</Typography>
        {error ? (
          <Box
            sx={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              height: "100%",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                padding: "20px",
                color: "#fff",
                backgroundColor: "rgba(0,0,0,0.3)",
                borderRadius: "10px",
              }}
            >
              Không tìm thấy số điện thoại <br />
              trong danh sách bạn bè.
            </Typography>
          </Box>
        ) : (
          <>
            {results.map((result, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar alt={result.username} src={result.image} />
                  <Typography>{result.username}</Typography>
                </Box>
                {checkRelationship(result)}
              </Box>
            ))}
          </>
        )}
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
        <Button variant="contained" onClick={handleSearch}>
          Tìm bạn
        </Button>
      </Box>
    </Box>
  );
};

export default AddFriend;
