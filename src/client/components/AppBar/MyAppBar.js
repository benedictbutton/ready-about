import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ReactCardFlip from 'react-card-flip';
import Menu from './Menu';
import DictionaryToolbar from '../Dictionary/Toolbar';
import TodosToolbar from '../Todos/Toolbar';
import Toolbars from './Toolbars';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  bar: {
    position: 'sticky',
    top: 0,
  },
}));

// <Component
// menuSwitch={menuSwitch}
// setMenuSwitch={setMenuSwitch}
// {...props}
// />
//

const MyAppBar = props => {
  const [menuSwitch, setMenuSwitch] = useState(true);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.bar}>
        <ReactCardFlip isFlipped={menuSwitch} infinite>
          <Toolbars
            menuSwitch={menuSwitch}
            setMenuSwitch={setMenuSwitch}
            location={location}
            {...props}
          />
          <Menu
            menuSwitch={menuSwitch}
            setMenuSwitch={setMenuSwitch}
          />
        </ReactCardFlip>
      </AppBar>
    </div>
  );
};

export default MyAppBar;
