import React, { useCallback, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// material-ui
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Profile from './Profile';

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
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
        <Profile handleLogOut={handleLogOut} />
      )}
    </>
  );
};

export default Inside;
