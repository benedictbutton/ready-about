import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// material-ui
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Slide, Fade } from 'react-reveal';
import { TransitionGroup } from 'react-transition-group';

import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
// import Fade from '@material-ui/core/Fade';
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Reminder from './Reminder';
import MyToolbar from './MyToolbar';
import AddTodo from './AddTodo';
import useForm from './CustomHooks';

const useStyles = makeStyles(theme => ({
  main: {
    flex: 1,
    background: '#9fa8a3',
    maxWidth: '85%',
    margin: theme.spacing(5, 0),
    paddingTop: theme.spacing(3),
  },
  root: {
    flex: 1,
    width: '100%',
    // padding: theme.spacing(3, 2)
  },
  paper: {
    boxShadow:
      '10px -5px 5px rgba(0,0,0,0.3), inset 3px -5px 5px rgba(0,0,0,0.3)',
    '&:hover': {
      elevation: 24,
    },
  },
  container: {
    flex: 1,
    // flexWrap: "wrap"
  },
  multi: {
    display: 'flexWrap',
  },
}));

// '0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12)'

const Todos = props => {
  const classes = useStyles();

  const { todos } = useSelector(state => state.todos);

  const {
    values,
    selected,
    handleClick,
    handleSelectAllClick,
    handleChange,
    handleSubmit,
    handleResetValues,
    handleResetSelected,
    handleKeyUp,
    handleKeyDown,
  } = useForm();

  const [checked, setChecked] = React.useState([0]);

  const isSelected = id => selected.indexOf(id) !== -1;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'TODOS_INDEX_REQUESTING' });
  }, []);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const deleteTodos = useCallback(() => {
    dispatch({ type: 'TODOS_DELETE_REQUESTING', selected }),
      [dispatch];
    handleResetSelected();
  });

  const todosList = todos.map(el => {
    const labelId = `checkbox-list-label-${el._id}`;
    const isItemSelected = isSelected(el._id);
    return (
      <Fade key={el._id} bottom cascade collapse>
        <Paper
          className={isItemSelected ? `${classes.paper}` : null}
          elevation={0}
        >
          <ListItem
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
        </Paper>
      </Fade>
    );
  });

  return (
    <div className={classes.root} align="center">
      <Grid
        container
        className={classes.main}
        justify="space-evenly"
        alignItems="center"
      >
        <Grid item xs={11}>
          <Paper elevation={10}>
            <MyToolbar
              numSelected={selected.length}
              numOfTodos={todos.length}
              onSelectAllClick={handleSelectAllClick}
              deleteTodos={deleteTodos}
              selected={selected}
              handleResetSelected={handleResetSelected}
            />
            <List dense={false}>
              <TransitionGroup appear={false} enter exit>
                {todosList}
              </TransitionGroup>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={11} align="center">
          <AddTodo />
        </Grid>
      </Grid>
    </div>
  );
};

export default Todos;
