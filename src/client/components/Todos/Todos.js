import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';

import Grid from '@material-ui/core/Grid';

import useForm from '../../CustomHooks/useForm';
import usePagination from '../../CustomHooks/usePagination';
import useSelectList from '../../CustomHooks/useSelectList';
import MyList from '../MyList';
import Main from '../Main';
import MyAppBar from '../AppBar/MyAppBar';
import EntryField from '../EntryField';

const Todos = () => {
  const lastItem = useRef(null);
  const dispatch = useDispatch();

  const [, setTrigger] = useState(true);

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
  } = useSelectList(todos);

  const { itemsPerPage, currentItems, paginate } = usePagination(
    todos,
  );

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
          previousLabel="Prev"
          nextLabel="Next"
          renderOnZeroPageCount={null}
          className="react-paginate"
        />
      }
    />
  );
};

export default Todos;
