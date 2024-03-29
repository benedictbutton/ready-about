import React from 'react';
// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    // flexWrap: 'wrap',
  },
  textField: {
    background: 'white',
    // margin: theme.spacing(2, 1, 0, 1),
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

const EntryField = ({ values, handleChange, handleSubmit }) => {
  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit} className={classes.container}>
      <Grid
        container
        className={classes.root}
        spacing={3}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item className={classes.root}>
          <TextField
            id="outlined-basic"
            className={classes.textField}
            autoComplete="off"
            placeholder="Enter Word..."
            margin="none"
            variant="outlined"
            name="word"
            value={values.word || ''}
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

export default EntryField;
