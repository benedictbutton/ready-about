import React from 'react';
import { useDispatch } from 'react-redux';
// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import useForm from './CustomHooks';

const useStyles = makeStyles(theme => ({
  root: { flex: 1 },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const AddTodo = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { values, handleChange, handleResetValues } = useForm();

  const postTodo = event => {
    event.preventDefault();
    dispatch({ type: 'TODO_POST_REQUESTING', values });
    handleResetValues();
  };

  return (
    <form onSubmit={postTodo}>
      <Grid
        container
        spacing={3}
        justify="space-around"
        alignItems="center"
      >
        <Grid item xs={9}>
          <TextField
            id="outlined-basic"
            className={classes.textField}
            style={{ margin: 8 }}
            fullWidth
            autoComplete="off"
            label="Todo"
            placeholder="Enter todo..."
            margin="normal"
            variant="outlined"
            name="item"
            value={values.item || ''}
            onChange={handleChange}
          />
        </Grid>
        <Grid item align="center">
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="primary"
          >
            Enter
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddTodo;
