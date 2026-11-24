import { useState } from "react";
import { Button, InputAdornment, TextField } from "@mui/material";
import { LOGIN_CONFIG } from "../config/login";

const TEXT = LOGIN_CONFIG.login;

function PasswordField({ error, disabled, ...props }) {
  const [visible, setVisible] = useState(false);

  return (
    <TextField
      {...props}
      type={visible ? "text" : "password"}
      fullWidth
      disabled={disabled}
      error={Boolean(error)}
      helperText={error}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <Button
                size="small"
                onClick={() => setVisible((value) => !value)}
                aria-pressed={visible}
                disabled={disabled}
              >
                {visible ? TEXT.hidePassword : TEXT.showPassword}
              </Button>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

export default PasswordField;