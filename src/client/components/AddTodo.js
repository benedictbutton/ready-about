import React from 'react';
import { useDispatch } from 'react-redux';
// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import useForm from './CustomHooks';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    // flexWrap: 'wrap',
  },
  root: { flex: 1 },
  textField: {
    background: 'white',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#191970',
        borderWidth: 'medium',
        borderRadius: 0,
      },

      '&:hover fieldset': {
        borderColor: '#191970',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#191970',
      },
    },
    '& .MuiOutlinedInput-notchedOutline legend': {
      // float: 'left',
      // paddingLeft: 0,
      // marginLeft: 0,
    },
  },
  button: {
    backgroundColor: '#191970',
    color: 'white',
  },
}));

const AddTodo = () => {
  const classes = useStyles();

  const { values, handleChange, handleResetValues } = useForm();

  const dispatch = useDispatch();
  const postTodo = event => {
    event.preventDefault();
    dispatch({ type: 'TODO_POST_REQUESTING', values });
    handleResetValues();
  };

  return (
    <form onSubmit={postTodo} className={classes.container}>
      <Grid
        container
        className={classes.root}
        spacing={3}
        justify="space-around"
        alignItems="center"
      >
        <Grid item xs={10}>
          <TextField
            id="outlined-basic"
            className={classes.textField}
            fullWidth
            autoComplete="off"
            placeholder="Enter Todo..."
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
            className={classes.button}
          >
            Enter
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddTodo;
