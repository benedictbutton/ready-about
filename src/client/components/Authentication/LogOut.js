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
    // box: {
    //   width: '300px',
    //   height: '300px',
    //   position: 'relative',
    //   '&:hover:after, &:hover:before': {
    //     transform: 'scale(1, 1)',
    //   },
    //   '&:after, &:before': {
    //     content: '',
    //     position: 'absolute',
    //     top: '30px',
    //     right: '30px',
    //     bottom: '30px',
    //     left: '30px',
    //     transition: 'all 0.5s',
    //   },
    //   '&:after': {
    //     borderRight: '1px solid yellow',
    //     borderLeft: '1px solid yellow',
    //     transform: 'scale(1, 0)',
    //   },
    //   '&:before': {
    //     borderTop: '1px solid yellow',
    //     borderBottom: '1px solid yellow',
    //     transform: 'scale(0, 1)',
    //   },
    // },
  },
}));

const SignOut = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleSignout = () => {
    dispatch({ type: 'SIGN_OUT' });
  };

  return (
    <Grid item xs={5} className="box" onClick={handleSignout}>
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
