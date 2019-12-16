import React from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
// material-ui
import Grid from "@material-ui/core/Grid";

const Entryway = props => {
  const { selection } = props.location.state;
  return (
    <Grid container direction="row" justify="space-evenly" alignItems="center">
      {selection === "signup" ? (
        <Grid item xs={12} md={3}>
          <SignUp />
        </Grid>
      ) : (
        <Grid item xs={12} md={3}>
          <SignIn />
        </Grid>
      )}
    </Grid>
  );
};

export default Entryway;
