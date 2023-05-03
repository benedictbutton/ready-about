import React from 'react';
import { useLocation } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

import SignUp from './SignUp';
import SignIn from './SignIn';

const Entryway = () => {
  const { state } = useLocation();

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
    >
      {state?.selection === 'signup' ? (
        <Grid item xs={12} md={3}>
          <SignUp />
        </Grid>
      ) : (
        <Grid item xs={12} md={3}>
          <SignIn />
        </Grid>
      )}
    </Grid>
  );
};

export default Entryway;
