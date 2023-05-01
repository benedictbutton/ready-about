import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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
  let navigate = useNavigate();

  const { successful, error } = useSelector(state => state.user);
  const todosError = useSelector(state => state.todos.error);

  useEffect(() => {
    if (!successful) navigate('/');
  }, [successful]);

  return (
    <>
      <div className={classes.root}>
        <Grid container justifyContent="flex-end">
          <Date />
          <Profile />
        </Grid>
      </div>
      <Outlet />
    </>
  );
};

export default Inside;
