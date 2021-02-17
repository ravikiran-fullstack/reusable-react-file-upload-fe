import React, { useRef, useState } from "react";
import { TextField, Grid, Button, Typography } from "@material-ui/core";

import Message from "../message/Message";

import useStyles from "./styles";
import axios from "axios";

const Upload = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [message, setMessage] = useState();
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInput = useRef();
  const classes = useStyles();

  const fileHandler = () => {
    console.log("file selected");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("file submitted ", fileInput.current.files[0]);
    const file = fileInput.current.files[0];
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const uploadUrl = "http://localhost:5000/upload";

    try {
      const response = await axios.post(uploadUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);
      const { fileName, filePath } = response.data;
      setUploadedFile({ fileName, filePath });
      setMessage("File Uploaded");
      setOpen(true);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setMessage("Error while uploading file");
      setOpen(true);
      setSuccess(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <label htmlFor="upload-photo">
          <input
            style={{ display: "none" }}
            id="upload-photo"
            name="upload-photo"
            type="file"
            ref={fileInput}
            onChange={fileHandler}
          />
          <Button
            color="secondary"
            variant="contained"
            component="span"
            size="small"
          >
            Choose File
          </Button>
        </label>
        <Button
          type="submit"
          className={classes.btn}
          variant="contained"
          color="primary"
        >
          Upload
        </Button>
      </form>
      {uploadedFile && (
        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          <Grid item xs={12} className={classes.gridItem}>
            <Typography variant="h5">
              File Name: {uploadedFile.fileName}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.gridItem}>
            <img
              style={{ width: "80%" }}
              src={uploadedFile.filePath}
              alt="uploadedFile"
            />
          </Grid>
        </Grid>
      )}
      {message && (
        <Message
          msg={message}
          closeMessage={handleClose}
          success={success}
          open={open}
        />
      )}
    </>
  );
};

export default Upload;
