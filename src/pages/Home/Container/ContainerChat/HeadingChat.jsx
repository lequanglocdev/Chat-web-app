import React, { useContext, useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { globalContext } from "~/context/globalContext";
import { getRemainUserForSingleRoom } from "~/utils/getRemainUserForSingleRoom";
import InfoToUser from "~/components/InfoToUser";
import InfoGroup from "../../../../components/InfoGroup";

const HeadingChat = () => {
  const { data, handler } = useContext(globalContext);
  const [open, setOpen] = useState(false);
  const modalRef = useRef();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const handleCloseOutsideModal = (event) => {
      if (
        open &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleCloseOutsideModal);

    return () => {
      document.removeEventListener("mousedown", handleCloseOutsideModal);
    };
  }, [open]);
  return (
    <Box>
      <Box
        sx={{
          border: "1px solid #3333",
          height: (theme) => theme.zalo.heightSearch,
        }}
      >
        {/* Left Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "8px", // Adjust as needed
          }}
        >
          <Tooltip title="Click to view details">
            <IconButton
              onClick={handleOpen}
              size="small"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <img
                alt={
                  data.currentRoom?.type === "single"
                    ? getRemainUserForSingleRoom(
                        data.currentRoom,
                        data.user?._id
                      )?.username
                    : "User Avatar"
                }
                src={
                  data.currentRoom?.type === "single"
                    ? getRemainUserForSingleRoom(
                        data.currentRoom,
                        data.user?._id
                      )?.image ||
                      "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                    : data.currentRoom?.image ||
                      "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                }
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </IconButton>
          </Tooltip>
          <Box sx={{ width: "100%" }}>
            <Box
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <Box sx={{ display: "flex", gap: 6 }}>
                <Typography>
                  {data.currentRoom?.type === "single"
                    ? getRemainUserForSingleRoom(
                        data.currentRoom,
                        data.user?._id
                      )?.username
                    : data.currentRoom.name.length > 30
                    ? `${data.currentRoom.name.substring(0, 30)}...`
                    : data.currentRoom.name}
                </Typography>
              </Box>
            </Box>
            <Box style={{ fontSize: "14px", color: "#7589A3" }}>
              {data.currentRoom?.type === "group"
                ? `${data.currentRoom?.users.length} thành viên`
                : ""}
            </Box>
          </Box>
        </Box>
      </Box>
      {data.currentRoom?.type === "group" ? (
        <Modal open={open} onClose={handleClose}>
          <Box
            ref={modalRef}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
              padding: "14px",
            }}
          >
            <InfoGroup handleClose={handleClose} />
          </Box>
        </Modal>
      ) : (
        <Modal open={open} onClose={handleClose}>
          <Box
            ref={modalRef}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
              padding: "14px",
            }}
          >
            <InfoToUser handleClose={handleClose} />
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default HeadingChat;
