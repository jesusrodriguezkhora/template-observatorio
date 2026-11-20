import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { USER_MENU_CONFIG } from "../config/userMenu";

const TEXT = USER_MENU_CONFIG.logoutConfirm;

function LogoutDialog({ open, onCancel, onConfirm }) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="logout-dialog-title"
      aria-describedby="logout-dialog-message"
    >
      <DialogTitle id="logout-dialog-title">{TEXT.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="logout-dialog-message">
          {TEXT.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>{TEXT.cancel}</Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          {TEXT.confirm}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LogoutDialog;