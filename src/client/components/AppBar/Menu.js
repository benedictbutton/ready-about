import React from 'react';
import { Link } from 'react-router-dom';
// material-ui
import IconButton from '@material-ui/core/IconButton';
import ListIcon from '@material-ui/icons/List';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CodeIcon from '@material-ui/icons/Code';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Toggle from './Toggle';

const useStyles = makeStyles(theme => ({
  button: {
    flex: 1,
  },
  icon: {
    margin: theme.spacing(0, 2),
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    backroundColor: 'blue',
  },
  title: {
    flex: '1 1 100%',
  },
}));

const Menu = ({ menuSwitch, setMenuSwitch, props }) => {
  const classes = useStyles(menuSwitch);

  return (
    <Toolbar className={classes.toolbar}>
      <div className={classes.title}>
        <Link to="/in/todos">
          <IconButton onClick={() => setMenuSwitch(!menuSwitch)}>
            <ListIcon
              className={classes.icon}
              style={{ color: 'white' }}
            />
          </IconButton>
        </Link>
        <Link to="/in/dictionary">
          <IconButton onClick={() => setMenuSwitch(!menuSwitch)}>
            <MenuBookIcon
              className={classes.icon}
              style={{ color: 'white' }}
            />
          </IconButton>
        </Link>
        <Link to="/in/scripts">
          <IconButton onClick={() => setMenuSwitch(!menuSwitch)}>
            <CodeIcon
              className={classes.icon}
              style={{ color: 'white' }}
            />
          </IconButton>
        </Link>
      </div>
      <Toggle menuSwitch={menuSwitch} setMenuSwitch={setMenuSwitch} />
    </Toolbar>
  );
};

export default Menu;
