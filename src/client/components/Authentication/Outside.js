import React from 'react';
import { Link } from 'react-router-dom';
// material-ui
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
  console.log(theme);
  return {
    root: {
      flex: 1,
      alignContent: 'center',
    },
    headerContainer: {
      borderColor: 'white',
      borderStyle: 'solid',
      borderWidth: 'thick',
      backgroundColor: 'rgba(40,67,135, .6)',
      padding: '1rem',
    },
    header: {
      color: '#e8eaf6',
      fontWeight: 'bold',
      '@media (max-width:768px)': {
        fontSize: '3rem',
      },
    },
    buttons: {
      marginTop: '3rem',
      marginBottom: '4rem',
    },
    button: {
      backgroundColor: '#bbdefb',
    },
  };
});

const Outside = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.root}
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        item
        xs={6}
        alignItems="flex-start"
        className={classes.headerContainer}
      >
        <Typography variant="h1" className={classes.header}>
          Ready About!
        </Typography>
      </Grid>
      <Grid
        container
        className={classes.buttons}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={3} align="center">
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
        <Grid item xs={3} align="center">
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
    </Grid>
  );
};

export default Outside;

// Outside => signin & signup buttons
// Entryway => either signin or signup comps
// Inside => signout button
