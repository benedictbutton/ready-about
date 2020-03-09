import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  type: {
    fontFamily: "'Parisienne', cursive",
  },
}));

const SubMenu = () => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h4" className={classes.type}>
        History
      </Typography>
      <Typography variant="h4" className={classes.type}>
        Favorites
      </Typography>
    </>
  );
};

export default SubMenu;
