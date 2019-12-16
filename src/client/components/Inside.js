import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
  const user = useSelector(state => state.user);
  const handleLogOut = () => {
    localStorage.removeItem('state');
    localStorage.clear();
    props.history.push('/');
    window.location.reload(true);
  };

  return (
    <>
      {!user.successful ? (
        <Redirect to="/" />
      ) : (
        <Profile handleLogOut={handleLogOut} />
      )}
    </>
  );
};

export default Inside;
