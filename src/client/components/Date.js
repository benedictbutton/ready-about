import React from 'react';
// material-ui
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  date: { margin: theme.spacing(2, 0, 0, 3) },
}));

const CurrentDate = () => {
  const classes = useStyles();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const dt = new Date();
  const month = months[dt.getMonth()];
  const day = dt.getDate();
  const date = `${month} ${day}`;

  return (
    <Grid item xs={9}>
      <Typography variant="h1" className={classes.date} align="left">
        {date}
      </Typography>
    </Grid>
  );
};

export default CurrentDate;
