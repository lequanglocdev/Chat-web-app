export const getRemainUserForSingleRoom = (room, currentUserId) => {
  if (room.type === "single") {
    const user = room.users.filter((item) => item._id !== currentUserId)[0];
    return user;
  }
};
