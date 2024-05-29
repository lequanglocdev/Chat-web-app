import React, { isValidElement, memo } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const InputForm = ({
  label,
  value,
  setValue,
  keyPayload,
  type,
  invalidFiels = [],
  setInvalidFiels,
}) => {
  let helperText = null;

  if (invalidFiels.length > 0 && invalidFiels.some((i) => i.name === type)) {
    helperText = (
      <Typography variant="span" sx={{ color: "red" }}>
        {invalidFiels.find((i) => i.name === type)?.message}
      </Typography>
    );
  }
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "43ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-multiline-flexible"
        type={type || "text"}
        label={label}
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [type]: e.target.value }))
        }
        onFocus={() => setInvalidFiels([])}
        error={!!helperText} // error được đặt thành true nếu có lỗi
        helperText={helperText} // Truyền giá trị của helperText vào
      />
    </Box>
  );
};

export default memo(InputForm);
