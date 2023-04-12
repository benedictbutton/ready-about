import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  type: {
    color: 'white',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
}));

const SignOut = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleSignout = () => {
    dispatch({ type: 'SIGN_OUT' });
  };

  return (
    <Grid item xs={5} onClick={handleSignout}>
      <Typography
        className={classes.type}
        variant="body1"
        component="button"
      >
        Log Out
      </Typography>
    </Grid>
  );
};

export default SignOut;
//
//
//
//
