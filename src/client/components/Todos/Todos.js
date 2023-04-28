import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import useForm from '../../CustomHooks/useForm';
import usePagination from '../../CustomHooks/usePagination';
import MyList from '../MyList';
import Main from '../Main';
import MyAppBar from '../AppBar/MyAppBar';
import EntryField from '../EntryField';
// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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

const Todos = props => {
  const classes = useStyles();
  const lastItem = useRef(null);
  const dispatch = useDispatch();

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

  const { itemsPerPage, currentItems, paginate } = usePagination(
    todos,
  );

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [handleKeyUp]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    dispatch({ type: 'TODOS_INDEX_REQUESTING' });
  }, [dispatch]);

  return (
    <Main
      appBar={
        <MyAppBar
          numSelected={selected.length}
          numOfTodos={todos.length}
          todos={todos}
          onSelectAllClick={handleSelectAllClick}
          deleteTodos={deleteTodos}
          selected={selected}
          handleResetSelected={handleResetSelected}
        />
      }
      main={
        <MyList
          listItems={currentItems}
          lastItem={el => (lastItem.current = el)}
          selected={selected}
          handleClick={handleClick}
        />
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
      pagination={
        <ReactPaginate
          onPageChange={paginate}
          pageCount={Math.ceil(todos?.length / itemsPerPage)}
          previousLabel={'Prev'}
          nextLabel={'Next'}
          renderOnZeroPageCount={null}
          className="react-paginate"
        />
      }
    />
  );
};

export default Todos;
