import React from 'react';
// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    // flexWrap: 'wrap',
  },
  root: { flex: 1 },
  textField: {
    background: 'white',
    margin: theme.spacing(2, 1, 0, 1),
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

export default EntryField;
