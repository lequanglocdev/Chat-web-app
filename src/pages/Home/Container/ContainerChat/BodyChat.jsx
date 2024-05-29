import React, { useContext, useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import FilterSharpIcon from "@mui/icons-material/FilterSharp";
import AttachFileSharpIcon from "@mui/icons-material/AttachFileSharp";
import TextField from "@mui/material/TextField";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { Paper } from "@mui/material";
import Button from "@mui/material/Button";
import { globalContext } from "../../../../context/globalContext";
import { api, baseURLOrigin, typeHTTP } from "../../../../utils/api";
import { io } from "socket.io-client";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import Picker from "emoji-picker-react";
const socket = io.connect(baseURLOrigin);

const heightBody = "592px";
const heightChat = "486px";
const heightText = `calc(${heightBody} - ${heightChat})`;

const options = ["Thu hồi tin nhắn"];
const ITEM_HEIGHT = 48;

const BodyChat = () => {
  const [message, setMessage] = useState("");
  const { data } = useContext(globalContext);
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);
  const [files, setFiles] = useState([]);
  const fileRef = useRef();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [showPicker, setShowPicker] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    api({
      method: typeHTTP.GET,
      url: `/message/get-by-room/${data.currentRoom?._id}`,
    }).then((messages) => setMessages(messages));
    // console.log(data.currentRoom?._id);
    socket.on(data.currentRoom?._id, (messages) => {
      setMessages(messages);
    });

    return () => {
      socket.off(data.currentRoom?._id);
    };
  }, [data.currentRoom, socket]);

  const handleSendMessage = () => {
    if (message.disabled) {
      handleSendDisable();
    } else {
      if (/\S/.test(message)) {
        const body = {
          room_id: data.currentRoom?._id,
          information: message,
          typeMessage: "text",
          user_id: data.user?._id,
          disabled: false,
        };

        socket.emit("send_message", body);
        setMessage("");
      } else {
        // Xử lý trường hợp không có ký tự trong thông tin tin nhắn
        console.log("Nội dung tin nhắn không được để trống");
      }
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      handleSendMessage();
    }
  };
  const handleSendDisable = (messageId) => {
    try {
      const body = {
        message_id: messageId,
      };
      api({
        url: "/message/disableMessage",
        method: typeHTTP.POST,
        body: body,
      }).then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendFile = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    const types = ["image", "video"];
    formData.append("room_id", data.currentRoom?._id);
    formData.append("information", file);
    formData.append(
      "typeMessage",
      types.includes(file.type.split("/")[0]) ? file.type.split("/")[0] : "file"
    );
    formData.append("user_id", data.user?._id);
    formData.append("disabled", false);
    api({
      url: "/message/send-file",
      method: typeHTTP.POST,
      body: formData,
    }).then((res) => {
      socket.emit("send_message_with_file", res);
    });
  };
  const onEmojiClick = (emojiObject) => {
    // setMessage(prevMessage => prevMessage + emojiObject.emoji);
    const emoji = emojiObject.emoji;
    setMessage(message + emoji);
    setShowPicker(false);
  };
  return (
    <Box
      sx={{
        height: heightBody,
      }}
    >
      <input
        type="file"
        ref={fileRef}
        onChange={(e) => handleSendFile(e)}
        style={{ display: "none" }}
      />
      <Box
        sx={{
          height: heightChat,
          gap: 1,
          overflow: "hidden",
          overflowY: "auto",
          "&::-webkit-scrollbar-thumb": { backgroundColor: "#b2bec3" },
          "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "#bfc2cf" },
        }}
      >
        <Paper
          style={{
            height: heightChat,
            overflowY: "auto",
            backgroundColor: "#bdc3c7",
          }}
          ref={chatContainerRef}
        >
          {messages.map((item, index) => (
            <Stack
              key={index}
              direction="row"
              justifyContent={
                item.user_id === data.user._id ? "flex-end" : "flex-start"
              }
              px="10px"
            >
              <Box
                p={1.5}
                m={1.5}
                sx={{
                  backgroundColor:
                    item.user_id === data.user._id ? "#ecf0f1" : "#ecf0f1",
                  borderRadius: "16px",
                }}
              >
                {item.disabled ? (
                  <Typography>Tin nhắn đã thu hồi </Typography>
                ) : (
                  <Typography
                    variant="body2"
                    color={
                      item.user_id === data.user._id ? "#34495e" : "#34495e"
                    }
                    sx={{ width: "100%" }}
                  >
                    {item.typeMessage === "text" ? (
                      <Typography
                        sx={{
                          width:
                            item.information.length > 100 ? "400px" : "auto",
                        }}
                      >
                        {item.information}
                      </Typography>
                    ) : item.information.url.includes("/image___") ? (
                      <img
                        src={item.information.url}
                        style={{
                          width: "350px",
                          height: "350px",
                          objectFit: "contain",
                        }}
                      />
                    ) : item.information.url.includes("/video___") ? (
                      <video
                        controls
                        style={{
                          width: "350px",
                          height: "350px",
                          objectFit: "contain",
                        }}
                        src={item.information.url}
                      />
                    ) : (
                      <a href={item.information.url}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <img
                            style={{ width: "80px" }}
                            src={`${
                              item.information.url
                                .split(".ap-southeast-1.amazonaws.com/")[1]
                                .split("___")[0]
                            }.png`}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span>{item.information.name}</span>
                            <span>
                              {(item.information.size / 1024).toFixed(2)} MB
                            </span>
                          </div>
                        </div>
                      </a>
                    )}
                  </Typography>
                )}
              </Box>
              <Box
                // aria-label="more"
                // id="long-button"
                // aria-controls={open ? "long-menu" : undefined}
                // aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                sx={{
                  position: "relative",
                  width: "40px",
                  height: "40px",
                  top: "16px",
                  cursor: "pointer",
                  // backgroundColor: "red",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MoreHorizIcon sx={{ fontSize: "16px" }} />
              </Box>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "26ch",
                  },
                }}
              >
                <MenuItem
                  // key={item._id}
                  onClick={() => handleSendDisable(item._id)}
                >
                  Thu hồi tin nhắn
                </MenuItem>
              </Menu>
            </Stack>
          ))}
        </Paper>
      </Box>
      <Box
        sx={{
          height: heightText,
        }}
      >
        <Box
          sx={{
            height: "40px",
            display: "flex",
            alignItems: "center",
            padding: "0 18px",
          }}
        >
          <FilterSharpIcon
            onClick={() => fileRef.current.click()}
            sx={{ margin: "20px" }}
          />
          <AttachFileSharpIcon onClick={() => fileRef.current.click()} />
        </Box>

        <Box
          sx={{
            width: "100%",
            maxWidth: "100%",
            border: "none",
            outline: "none",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            placeholder="nhập tin nhắn"
            multiline // Đánh dấu TextField là nhiều dòng
            maxRows={5} // Giới hạn số dòng hiển thị (thay đổi giá trị tùy theo nhu cầu)
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            onKeyPress={handleKeyPress}
            sx={{
              "& .MuiInputBase-root": {
                paddingRight: "50px",
                // paddingTop: "100px",
                // overflow: "hidden",
              },
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              position: "absolute",
              right: 0,
            }}
          >
            <InsertEmoticonIcon
              onClick={() => setShowPicker((val) => !val)}
              sx={{
                position: "relative",
                marginRight: "20px",
                cursor: "pointer",
              }}
            />
            {showPicker && (
              <Box
                sx={{
                  position: "absolute",
                  bottom: "50px", // Adjust this value to move the Picker component
                  right: 0,
                  zIndex: 10,
                }}
              >
                <Picker onEmojiClick={onEmojiClick} />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BodyChat;
