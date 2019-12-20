import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// material-ui
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import useForm from './CustomHooks';

const useStyles = makeStyles(theme => ({
  root: {
    background: 'white',
  },
  paper: {
    backgroundColor: '#191970',
    borderStyle: 'solid',
    borderColor: 'white',
    borderWidth: 'thick',
  },
  type: {
    color: 'white',
  },
}));

const EditTodo = props => {
  const {
    selected,
    handleResetSelected,
    editOpen,
    handleEditClose,
  } = props;

  const [values, setValues] = useState();

  const classes = useStyles();

  const { todos } = useSelector(state => state.todos);

  useEffect(() => {
    if (selected.length !== 1) return;
    const todo = todos.filter(el => el._id === selected[0])[0].item;
    setValues(todo);

    return () => values;
  }, [selected]);

  const handleChange = event => {
    event.persist();
    setValues(values => event.target.value);
  };

  const dispatch = useDispatch();
  const editTodo = () => {
    event.preventDefault();
    const editProp = 'item';
    dispatch({
      type: 'TODO_EDIT_REQUESTING',
      selected,
      values,
      editProp,
    });
    handleResetSelected();
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      PaperProps={{ className: classes.paper }}
      open={editOpen}
      onClose={handleEditClose}
      aria-labelledby="form-dialog-title"
    >
      <form onSubmit={editTodo}>
        <DialogTitle id="form-dialog-title" className={classes.type}>
          <strong>Edit Todo</strong>
        </DialogTitle>
        <DialogContent className={classes.text}>
          <TextField
            className={classes.root}
            fullWidth
            id="outlined-multiline-static"
            label="Edit"
            value={values || ''}
            autoFocus
            multiline
            rows="4"
            variant="filled"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.type}
            onClick={handleEditClose}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            className={classes.type}
            type="submit"
            onClick={handleEditClose}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditTodo;
