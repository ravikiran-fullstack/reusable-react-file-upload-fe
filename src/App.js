import React from "react";
import Upload from "./components/upload/Upload";

import { Grid, Paper, Typography } from "@material-ui/core";

import useStyles from "./styles";

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.gridItem}>
          <Typography variant="h3"> React File Upload App </Typography>
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
          <Upload />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
