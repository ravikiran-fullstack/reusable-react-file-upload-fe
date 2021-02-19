import React from "react";
import PropTypes from "prop-types";

import { Button, Snackbar, IconButton } from "@material-ui/core";
// import CloseIcon from '@material-ui/icons/close';
import MuiAlert from "@material-ui/lab/Alert";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Message = ({ msg, setOpen, open, success }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={ success ? 'success': 'error'}>
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
};

Message.propTypes = {
  msg: PropTypes.string.isRequired,
};

export default Message;
