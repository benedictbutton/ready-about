import React, { useState } from 'react';
// material-ui
import { makeStyles } from '@material-ui/core/styles';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
  paper: {
    boxShadow:
      '10px -5px 5px rgba(0,0,0,0.3), inset 3px -5px 5px rgba(0,0,0,0.3)',
    '&:hover': {
      elevation: 24,
    },
  },
  list: {
    flex: 1,
    height: '100%',
  },
  container: {
    flex: 1,
    // flexWrap: "wrap"
  },
  multi: {
    display: 'flexWrap',
  },
  scroll: {
    height: 53,
    marginTop: theme.spacing(3),
  },
}));

const MyList = ({ listItems, lastItem, selected, handleClick }) => {
  const classes = useStyles();

  const isSelected = id => selected.indexOf(id) !== -1;

  const list = listItems.map(el => {
    const labelId = `checkbox-list-label-${el._id}`;
    const isItemSelected = isSelected(el._id);

    return (
      <CSSTransition key={el._id} classNames="item" timeout={500}>
        <ListItem
          className={isItemSelected ? `${classes.paper}` : null}
          role={undefined}
          dense
          button
          onClick={event => handleClick(event, el._id)}
        >
          <ListItemIcon>
            <Checkbox
              checked={isItemSelected}
              inputProps={{ 'aria-labelledby': labelId }}
            />
          </ListItemIcon>
          <ListItemText
            id={labelId}
            primary={el.item}
            style={{ wordWrap: 'break-word' }}
            primaryTypographyProps={{
              variant: 'h6',
            }}
          />
        </ListItem>
      </CSSTransition>
    );
  });

  return (
    <List dense className={classes.list}>
      <TransitionGroup>{list}</TransitionGroup>
      <span
        className={classes.scroll}
        ref={lastItem}
        aria-hidden="true"
      />
    </List>
  );
};

export default MyList;
