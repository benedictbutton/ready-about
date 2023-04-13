import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Toggle from '../AppBar/Toggle';
// import withAppBar from '../AppBar/withAppBar';

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    backgroundColor: '#3B5768',
  },
  title: {
    flex: '1 1 100%',
  },
}));

const DictionaryToolbar = ({
  menuSwitch,
  setMenuSwitch,
  numSelected,
  numOfTodos,
  onSelectAllClick,
  deleteTodos,
  selected,
  handleResetSelected,
}) => {
  const classes = useStyles();

  return (
    <Toolbar className={classes.root}>
      <Typography
        className={classes.title}
        align="center"
        variant="h4"
        id="tableTitle"
      >
        DICTIONARY
      </Typography>
      <Toggle menuSwitch={menuSwitch} setMenuSwitch={setMenuSwitch} />
    </Toolbar>
  );
};

export default DictionaryToolbar;
