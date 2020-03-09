import React, { useState } from 'react';
// material-ui
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  type: {
    color: 'white',
  },
}));

const Field = ({
  detailProp,
  detailValue,
  property,
  setOpen,
  setProfile,
  setField,
}) => {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={5}>
        <Typography className={classes.type} variant="body1">
          {detailProp}
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography className={classes.type} variant="body1">
          {detailValue}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <IconButton
          onClick={() => {
            setOpen(true);
            setProfile(false);
            setField(property);
          }}
        >
          <EditIcon className={classes.type} />
        </IconButton>
      </Grid>
    </>
  );
};

export default Field;
