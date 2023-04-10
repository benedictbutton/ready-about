import React from 'react';
import { Link } from 'react-router-dom';
// material-ui
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
  },
  header: {
    color: '#e8eaf6',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#bbdefb',
  },
}));

const Outside = () => {
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        className={classes.root}
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12} align="center">
          <Typography variant="h1" className={classes.header}>
            Ready About!
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        className={classes.root}
        justify="center"
        alignItems="flex-start"
      >
        <Grid item xs={5} align="center">
          <Link
            to="/entryway"
            state={{ selection: 'signup' }}
            style={{ textDecoration: 'none' }}
          >
            <Button variant="contained" className={classes.button}>
              Sign Up
            </Button>
          </Link>
        </Grid>
        <Grid item xs={5} align="center">
          <Link
            to="/entryway"
            state={{ selection: 'signin' }}
            style={{ textDecoration: 'none' }}
          >
            <Button variant="contained" className={classes.button}>
              Sign In
            </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

export default Outside;

// Outside => signin & signup buttons
// Entryway => either signin or signup comps
// Inside => signout button
