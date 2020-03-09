import React, { useCallback, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// material-ui
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Date from '../Date';
import Profile from '../Profile/Profile';

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    width: '100%',
  },
}));

const Inside = props => {
  const classes = useStyles();

  const { successful, error } = useSelector(state => state.user);
  const todosError = useSelector(state => state.todos.error);
  const dispatch = useDispatch();

  // if (!successful || todosError === 401 || error === 401)
  //   handleLogOut();

  const handleLogOut = useCallback(() => {
    dispatch({ type: 'SIGN_OUT' }), [dispatch];
  });

  return (
    <>
      {!successful ? (
        <Redirect to="/" />
      ) : (
        <div className={classes.root}>
          <Grid container justify="flex-end">
            <Date />
            <Profile handleLogOut={handleLogOut} />
          </Grid>
        </div>
      )}
    </>
  );
};

export default Inside;
