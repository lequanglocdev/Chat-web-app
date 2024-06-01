import Button from "@mui/material/Button";
const ButtonComponents = ({ text, startIcon, onClick }) => {
  return (
    <Button
      variant="contained"
      disableElevation
      startIcon={startIcon}
      onClick={onClick}
      sx={{
        margin: "auto",
        marginTop: "10px",
        display: "block",
        width: "380px",
        fontSize: "16px",
      }}
    >
      {text}
    </Button>
  );
};

export default ButtonComponents;
