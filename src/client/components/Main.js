import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import EntryField from './EntryField';

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    width: '100%',
    // height: '80vh',
    // padding: theme.spacing(3, 2)
  },
  main: {
    flex: 1,
    background: '#9fa8a3',
    maxWidth: '85%',
    margin: theme.spacing(3, 0),
    padding: theme.spacing(3, 0),
  },
  grid: {
    height: '100%',
  },
  paper: {
    height: 500,
    positiion: 'relative',
    overflowY: 'auto',
  },
}));

const Main = ({ appBar, main, textField }) => {
  const classes = useStyles();
  return (
    <div className={classes.root} align="center">
      <Grid
        container
        className={classes.main}
        justify="space-evenly"
        alignItems="center"
      >
        <Grid item xs={11} className={classes.grid}>
          {appBar}
          <Paper className={classes.paper} elevation={10}>
            {main}
          </Paper>
        </Grid>
        {textField}
      </Grid>
    </div>
  );
};

export default Main;
