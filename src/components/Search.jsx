import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import AddFriend from "./AddFriend";
import { Link } from "react-router-dom";
import AddGroup from "./AddGroup";
import { globalContext } from "../context/globalContext";
import { api, typeHTTP } from "../utils/api";
const SearchStyle = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 20,
  backgroundColor: "#dfe6e9",

  "&:hover": {
    backgroundColor: "#dfe6e9",
    borderRadius: 20,
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(0),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#636e72",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",

  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),

    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        border: "1px solid #74b9ff",
        borderRadius: 20,
      },
    },
  },
}));

const Search = () => {
  const [openModalAddFriend, setOpenModalAddFriend] = React.useState(false);
  const [openModalAddGroup, setOpenModalAddGroup] = React.useState(false);
  const handleOpenModalAddFriend = () => setOpenModalAddFriend(true);
  const handleOpenModalAddGroup = () => setOpenModalAddGroup(true);
  const [phone, setPhone] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(false);
  const handleCloseModalAddFriend = (event) => {
    event.stopPropagation();
    setOpenModalAddFriend(false);
  };
  const handleCloseModalAddGroup = (event) => {
    event.stopPropagation();
    setOpenModalAddGroup(false);
  };
  const handleSearch = () => {
    if (phone.trim() !== "" && phone.length >= 9 && phone.length <= 10) {
      setResults([]);
      api({ url: "/user/find", method: typeHTTP.GET }).then((res) => {
        const filteredResults = res.filter((item) =>
          item.phone.includes(phone.toLowerCase())
        );
        setResults(filteredResults);
        setError(filteredResults.length === 0);
      });
    } else {
      setError(true);
    }
  };
  return (
    <Box>
      <Toolbar>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={8} md={9}>
            <SearchStyle>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Tìm kiếm"
                inputProps={{ "aria-label": "search" }}
              />
            </SearchStyle>
          </Grid>
          <Grid item xs={6} sm={2} md={1}>
            <Tooltip title="Thêm bạn">
              <IconButton onClick={handleOpenModalAddFriend}>
                <PersonAddAltIcon />
              </IconButton>
              <Modal
                open={openModalAddFriend}
                onClose={handleCloseModalAddFriend}
              >
                <AddFriend
                  handleCloseModalAddFriend={handleCloseModalAddFriend}
                />
              </Modal>
            </Tooltip>
          </Grid>
          <Grid item xs={6} sm={2} md={1}>
            <Tooltip title="Tạo nhóm chat">
              <IconButton onClick={handleOpenModalAddGroup}>
                <GroupAddIcon />
              </IconButton>
              <Modal
                open={openModalAddGroup}
                onClose={handleCloseModalAddGroup}
              >
                <AddGroup handleCloseModalAddGroup={handleCloseModalAddGroup} />
              </Modal>
            </Tooltip>
          </Grid>
        </Grid>
      </Toolbar>
    </Box>
  );
};

export default Search;
