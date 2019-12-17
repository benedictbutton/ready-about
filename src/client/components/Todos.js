import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// material-ui
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
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
  paper: {},
  container: {
    flex: 1,
    // flexWrap: "wrap"
  },
  multi: {
    display: 'flexWrap',
  },
}));

const Todos = props => {
  const classes = useStyles();

  // const { token } = useSelector(state => state.user);
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
      <ListItem
        key={el._id}
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
          primaryTypographyProps={{
            wrap: 'nowrap',
            overflow: 'hidden',
          }}
          id={labelId}
          primary={el.item}
        />
      </ListItem>
    );
  });

  //  const [isLoading, setIsLoading] = useState(false);
  //   const [isError, setIsError] = useState(false);
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       setIsError(false);
  //       setIsLoading(true);
  //       try {
  //         const result = await axios(url);
  //         setData(result.data);
  //       } catch (error) {
  //         setIsError(true);
  //       }
  //       setIsLoading(false);
  //     };
  //     fetchData();
  //   }, [url]);
  //   return [{ data, isLoading, isError }, setUrl];
  // }
  //
  //
  // debugger;
  //

  return (
    <div className={classes.root} align="center">
      <Grid
        container
        className={classes.main}
        justify="space-evenly"
        alignItems="center"
      >
        <Grid item xs={11}>
          <Paper>
            <MyToolbar
              numSelected={selected.length}
              numOfTodos={todos.length}
              onSelectAllClick={handleSelectAllClick}
              deleteTodos={deleteTodos}
              selected={selected}
              handleResetSelected={handleResetSelected}
            />
            <List dense={false}>{todosList}</List>
          </Paper>
        </Grid>
        <Grid item xs={11}>
          <AddTodo />
        </Grid>
      </Grid>
    </div>
  );
};

export default Todos;
