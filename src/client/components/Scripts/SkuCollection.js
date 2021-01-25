import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  grid: {
    padding: theme.spacing(1),
  },
  text: {
    textAlign: 'left',
    padding: theme.spacing(2),
  },
}));

const SkuCollection = ({ promo, handleChange }) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12} align="left">
        <TextField
          id="filled-helperText"
          helperText="Enter promo name here"
          variant="filled"
          name="promo"
          value={promo || ''}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} className={classes.grid}>
        <Typography
          className={classes.text}
          variant="body1"
          gutterBottom
        >
          SELECT p.sku, ppa.productid,
          ppa.productpromotionattributeid, ppc.code FROM
          productpromotionattribute ppa INNER JOIN product p on
          p.productid = ppa.productid INNER JOIN
          productpromotioncontext ppc ON
          ppa.productpromotionattributeid =
          ppc.productpromotionattributeid WHERE code = 'store' AND
          promotionid = (SELECT promotionid from promotion WHERE name
          = '{promo}
          ')
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SkuCollection;
