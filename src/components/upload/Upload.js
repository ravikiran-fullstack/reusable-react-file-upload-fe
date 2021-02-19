import React, { useRef, useState } from "react";
import { Grid, Button, Typography, Slider } from "@material-ui/core";

import Message from "../message/Message";

import useStyles from "./styles";
import axios from "axios";

const Upload = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [message, setMessage] = useState();
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [percentage, setPercentage] = useState(0);
  const fileInput = useRef();
  const classes = useStyles();

  const fileHandler = () => {
    setPercentage(0);
    setUploadedFile(null);
    setSelectedFile(null);
    console.log("file selected");
    const file = fileInput.current.files[0];
    if (!file) {
      return;
    }
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    const uploadUrl = "http://localhost:5000/upload";
    setPercentage(0);
    try {
      const response = await axios.post(uploadUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          );
          // Update state here
          setPercentage(progress);
          console.log(progress);
        },
      });
      console.log(response);
      const { fileName, filePath } = response.data;
      setUploadedFile({ fileName, filePath });
      setMessage("File Uploaded");
      setOpen(true);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setSelectedFile(null);
      setMessage("Error while uploading file");
      setOpen(true);
      setSuccess(false);
    }
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
      {selectedFile ? (
        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          <Grid item xs={12} className={classes.gridItem}>
            <Typography variant="h5">File Name: {selectedFile.name}</Typography>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          <Grid item xs={12} className={classes.gridItem}>
            <Typography variant="h5">Choose a file to upload</Typography>
          </Grid>
        </Grid>
      )}
      {uploadedFile && (
        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          <Grid item xs={12} className={classes.gridItem}>
            <img
              style={{ width: "30%", height: "50vh" }}
              src={uploadedFile.filePath}
              alt="uploadedFile"
            />
          </Grid>
        </Grid>
      )}
      {percentage > 0 && (
        <div style={{ textAlign: "center" }}>
          Upload Progress: {percentage}%    
        </div>
      )}
      {message && (
        <Message
          msg={message}
          setOpen={setOpen}
          success={success}
          open={open}
        />
      )}
    </>
  );
};

export default Upload;
