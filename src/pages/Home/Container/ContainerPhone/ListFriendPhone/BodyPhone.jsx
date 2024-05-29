import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import CloseIcon from "@mui/icons-material/Close";

import { useState, useContext, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple } from "@mui/material/colors";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import { globalContext } from "../../../../../context/globalContext";
import { api, typeHTTP } from "../../../../../utils/api";
const options = [
  "Đánh dấu tin nhắn đã đọc",
  "Gửi tin đồng thời",
  "Trở lại giao diện cơ bản",
];
const ITEM_HEIGHT = 48;
const BodyPhone = () => {
  const [searchValue, setSearchValue] = useState("");
  const [name, setName] = useState("");

  //const [friendId, setFriendId] = useState("");
  //console.log("friendId", friendId)
  // console.log("setFriendId", setFriendId)
  const handleChange = (event) => {
    setName(event.target.value);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const { data, handler } = useContext(globalContext);
  const userFriend = data.user?._id;
  useEffect(() => {
    //console.log("Danh sách bạn bè:");
    data.user.friends.forEach((friend, index) => {
      //console.log(`Bạn bè ${index + 1} Có friendId: ${friend.friendId}`);
    });
  }, [data]);

  useEffect(() => {
    // Thực hiện truy vấn API khi friendId thay đổi

    api({ url: "/user/find", method: typeHTTP.GET }).then((res) => {
      const arr = [];
      res.forEach((item) => {
        if (
          item.friends &&
          item.friends.some((friend) => friend.friendId === userFriend)
        ) {
          arr.push(item);
        }
      });
      setResult(arr);
      setInitialResults(arr);
    });
  }, [userFriend]);
  const [result, setResult] = useState([]);
  const [initialResults, setInitialResults] = useState([]);

  // Log ra thông tin của các người dùng được tìm thấy
  useEffect(
    () => {
      //console.log("Kết quả tìm kiếm:", result);
      result.forEach((user, index) => {
        //console.log(`Thông tin người dùng ${index + 1}:`);
        //console.log("_id:", user._id);
        //console.log("Username:", user.username);
        //console.log("Image:", user.image);
      });
    },
    [result],
    [setInitialResults]
  );

  const handleClose = () => {
    setAnchorEl(null);
  };
  // tim
  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
    const filteredResults = initialResults.filter((user) =>
      user.username.toLowerCase().includes(value.toLowerCase())
    );
    setResult(filteredResults);
  };
  // săp sep
  const [sortingOption, setSortingOption] = useState("");
  useEffect(() => {
    if (sortingOption === "Tên (A-Z)") {
      // Nếu người dùng chọn sắp xếp theo tên (A-Z)
      const sortedResults = [...result].sort((a, b) =>
        a.username.localeCompare(b.username)
      ); // Sắp xếp danh sách theo tên (A-Z)
      setResult(sortedResults); // Cập nhật danh sách bạn bè với danh sách đã sắp xếp
    }
  }, [sortingOption, result]);
  const handleSortChange = (event) => {
    setSortingOption(event.target.value); // Cập nhật giá trị của biến sortingOption khi người dùng thay đổi tùy chọn sắp xếp
  };
  return (
    <Box
      sx={{
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        height: (theme) => theme.zalo.heightList,
        gap: 1,
        overflow: "hidden",
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
      <Box sx={{ height: "64px" }}>
        <Typography>Bạn bè ({result.length}) </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "64px",
        }}
      >
        <TextField
          id="outlined-search"
          label="Tìm bạn "
          type="text"
          size="small"
          value={searchValue}
          // onChange={(e) => setSearchValue(e.target.value)}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{ cursor: "pointer", borderRadius: "10px" }}
              >
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <CloseIcon
                sx={{
                  color: searchValue ? "white" : "transparent",
                  cursor: "pointer",
                }}
                onClick={() => setSearchValue("")}
              />
            ),
          }}
          sx={{
            minWidth: "260px",
          }}
        />
        <FormControl sx={{ m: 1, minWidth: "260px" }} size="small">
          <InputLabel id="demo-select-small-label">Tên (A-Z)</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={sortingOption}
            label="Tên (A-Z)"
            onChange={handleSortChange}
          >
            <MenuItem value="Tên (A-Z)">Tên (A-Z)</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: "260px" }} size="small">
          <InputLabel id="demo-select-small-label">Tất cả</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={name}
            label="Tất cả"
            onChange={handleChange}
          >
            <MenuItem value={10}>Tất cả</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box>
        {result.map((user, index) => (
          <Box key={index}>
            <Typography
              sx={{ height: "32px", display: "flex", alignItems: "center" }}
            >
              {user.username.charAt(0).toUpperCase()}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar src={user.image} sx={{ bgcolor: deepOrange[500] }}>
                {user.username[0]}
              </Avatar>
              <Typography sx={{ paddingX: 2 }}>{user.username}</Typography>
              <IconButton
                aria-label="more"
                id={`long-button-${index}`}
                aria-controls={open ? `long-menu-${index}` : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                sx={{ position: "relative", right: "0" }}
              >
                <MoreHorizIcon sx={{ fontSize: "16px" }} />
              </IconButton>
              <Menu
                id={`long-menu-${index}`}
                MenuListProps={{
                  "aria-labelledby": `long-button-${index}`,
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
                {options.map((option) => (
                  <MenuItem
                    key={option}
                    selected={option === "Pyxis"}
                    onClick={handleClose}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default BodyPhone;
