import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    width: '100%',
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
    position: 'relative',
  },
}));

const Main = ({ appBar, main, textField, pagination }) => {
  const classes = useStyles();
  return (
    <motion.div
      className={classes.root}
      align="center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
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
        {pagination}
        {textField}
      </Grid>
    </motion.div>
  );
};

export default Main;
