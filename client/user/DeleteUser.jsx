import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import { Delete, DeleteIcon } from "@material-ui/icons";

import React, { useState } from "react";
import { Navigate } from "react-router";

import { auth } from "../auth/auth-helper";
import { remove } from "./api-user";

const DeleteUser = (props) => {
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const jwt = auth.isAuthenticated();
  // console.log(jwt);

  const clickButton = () => {
    setOpen(true);
  };

  const handleRequestClose = () => {
    setOpen(false);
  };

  const deleteAccount = () => {
    console.log("account will be deleted!");
    remove({ userId: props.userId }, { t: jwt.token }).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        auth.clearJWT(() => console.log("Deleted user!"));
        // setRedirect(true);
      }
    });
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to='/' replace={true} />;
  }

  return (
    <span>
      <IconButton aria-label='Delete' onClick={clickButton} color='secondary'>
        <Delete />
      </IconButton>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your account
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={deleteAccount}
            color='secondary'
            autoFocus='autoFocus'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
};

export default DeleteUser;
