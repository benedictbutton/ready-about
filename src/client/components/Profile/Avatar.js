import React from 'react';
// material-ui
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  bigAvatar: {
    width: 50,
    height: 50,
  },
}));

const MyAvatar = ({ userImage, username }) => {
  const classes = useStyles();
  return (
    <Grid item xs={5}>
      {userImage ? (
        <Avatar
          alt="profile picture"
          src={userImage}
          className={classes.bigAvatar}
        />
      ) : (
        <Avatar className={classes.bigAvatar}>
          {username[0]?.toUpperCase()}
        </Avatar>
      )}
    </Grid>
  );
};

export default MyAvatar;
