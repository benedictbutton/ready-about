import React from 'react';
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
    boxShadow: '-17px 17px 2px 0px rgba(0,0,0,0.1)',
    left: '3%',
    background: 'white',
    paddingTop: 0,
    paddingBottom: 0,
    '&:hover': {
      background: 'white',
    },
  },
  list: {
    flex: 1,
    height: '500px',
    background: 'white',
  },
  container: {
    flex: 1,
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

  const list = listItems?.map(el => {
    const labelId = `checkbox-list-label-${el._id}`;
    const isItemSelected = isSelected(el._id);

    return (
      <CSSTransition key={el._id} classNames="item" timeout={500}>
        <ListItem
          key={el._id}
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
    <>
      <List dense className={classes.list}>
        <TransitionGroup>{list}</TransitionGroup>
        <span
          className={classes.scroll}
          ref={lastItem}
          aria-hidden="true"
        />
      </List>
    </>
  );
};

export default MyList;
