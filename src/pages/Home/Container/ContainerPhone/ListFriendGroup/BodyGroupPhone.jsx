import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import CloseIcon from "@mui/icons-material/Close";

import { useState , useContext, useEffect } from "react";
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
const BodyGroupPhone = () => {
  const [searchValue, setSearchValue] = useState("");
  const [name, setName] = useState("");
  const handleChange = (event) => {
    setName(event.target.value);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data, handler } = useContext(globalContext);
  const [matchingRooms, setMatchingRooms] = useState([]);
  const [initialMatchingRooms, setInitialMatchingRooms] = useState([]);
  const currentUser = data.user?._id;
  // console.log("user",currentUser);
   //const Rooms  = data.rooms;
  // console.log("Rooms",Rooms);

  useEffect(() => {
    if (data?.rooms) {
     // console.log("Rooms data:", data.rooms); // Debugging statement to ensure rooms data is available
      const sl = data.rooms.filter(room => 
        room.type === "group" && room.users.some(user => user._id === currentUser)
      );
      setMatchingRooms(sl);
      setInitialMatchingRooms(sl);
      //console.log("Số nhóm : ", sl.length);

      matchingRooms.forEach(room => {
       // console.log("Group ID:", room._id);
       // console.log("Group Name:", room.name);
       // console.log("Group Image:", room.image);
      });
      
    } else {
      console.log("No rooms data available."); // Debugging statement if rooms data is not available
    }
  }, [data]);
//Tìm
  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
    if (value === "") {
      setMatchingRooms(initialMatchingRooms);
    } else {
      const results = initialMatchingRooms.filter((room) =>
        room.name.toLowerCase().includes(value.toLowerCase())
      );
      setMatchingRooms(results);
    }
  };
  // Sắp xếp từu A-Z
  const [sortingOption, setSortingOption] = useState(""); 
  useEffect(() => {
    if (sortingOption === "Tên (A-Z)") { // Nếu người dùng chọn sắp xếp theo tên (A-Z)
      const sortedRooms = [...matchingRooms].sort((a, b) => a.name.localeCompare(b.name)); // Sắp xếp danh sách theo tên (A-Z)
      setMatchingRooms(sortedRooms); // Cập nhật danh sách matchingRooms với danh sách đã sắp xếp
    }
  }, [sortingOption, matchingRooms]);
  
  const handleSortChange = (event) => {
    setSortingOption(event.target.value); // sortingOption khi người dùng thay đổi tùy chọn sắp xếp
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
        <Typography>Nhóm ({matchingRooms.length}) </Typography>
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
          label="Tìm nhóm "
          type="text"
          size="small"
          value={searchValue}
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
           // onChange={handleChange}
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
      
      {matchingRooms.map((room, index) => (
        <Box key={index}>
      <Box>
        <Typography
          sx={{ height: "32px", display: "flex", alignItems: "center" }}
        >
          {room.name.charAt(0).toUpperCase()}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ bgcolor: deepOrange[500] }}>A</Avatar>
          <Typography sx={{ paddingX: 2 }}>{room.name}</Typography>

          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            sx={{ position: "relative", right: "0" }}
          >
            <MoreHorizIcon sx={{ fontSize: "16px" }} />
          </IconButton>
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
      </Box>
    ))}
    </Box>
  );
};

export default BodyGroupPhone;
