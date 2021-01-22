import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
// material-ui
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Slide, Fade } from 'react-reveal';
import {
  TransitionGroup,
  CSSTransition,
} from 'react-transition-group';
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
import Main from '../Main';
import Reminder from './Reminder';
import TodosToolbar from './Toolbar';
import useForm from '../CustomHooks';
import MyAppBar from '../AppBar/MyAppBar';
import EntryField from '../EntryField';

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
    // position: 'absolute',
  },
  list: {
    flex: 1,
    // position: 'relative',
    // overflowY: 'auto',
    height: '100%',
    // paddingBottom: theme.spacing(5),
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

// '0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12)'

const Todos = props => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const lastItem = useRef(null);

  const [trigger, setTrigger] = useState(true);

  const { todos } = useSelector(state => state.todos);

  const handleScroll = () => {
    if (lastItem)
      lastItem.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
  };

  const addTodo = () => {
    dispatch({ type: 'TODO_POST_REQUESTING', values });
    handleResetValues();
    handleScroll();
  };

  const deleteTodos = () => {
    setTrigger(false);
    dispatch({ type: 'TODOS_DELETE_REQUESTING', selected });
    handleResetSelected();
  };

  const {
    values,
    handleChange,
    handleSubmit,
    handleResetValues,
  } = useForm(addTodo);

  const {
    selected,
    handleClick,
    handleSelectAllClick,
    handleResetSelected,
    handleKeyUp,
    handleKeyDown,
  } = useForm();

  const [checked, setChecked] = React.useState([0]);

  const isSelected = id => selected.indexOf(id) !== -1;

  useEffect(() => {
    dispatch({ type: 'TODOS_INDEX_REQUESTING' });
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [handleKeyUp]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // <CSSTransition timeout={500} key={el._id}>

  const todosList = todos.map(el => {
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

  // const groupProps = {
  //   appear: false,
  //   enter: true,
  //   exit: true,
  // };

  return (
    <Main
      appBar={
        <MyAppBar
          numSelected={selected.length}
          numOfTodos={todos.length}
          onSelectAllClick={handleSelectAllClick}
          deleteTodos={deleteTodos}
          selected={selected}
          handleResetSelected={handleResetSelected}
        />
      }
      main={
        <List dense className={classes.list}>
          <TransitionGroup>{todosList}</TransitionGroup>
          <span
            className={classes.scroll}
            ref={el => (lastItem.current = el)}
            aria-hidden="true"
          />
        </List>
      }
      textField={
        <Grid item xs={11} align="center">
          <EntryField
            values={values}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </Grid>
      }
    />
  );
};

export default Todos;
