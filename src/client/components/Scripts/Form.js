import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Script from './Scripts';
import useForm from '../CustomHooks';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      // width: '25ch',
    },
  },
  form: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(2),
  },
}));

const Form = ({
  values,
  handleChange,
  handleSubmit,
  handleResetValues,
  ppa,
  setPpa,
}) => {
  const classes = useStyles();
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className={classes.form}>
        <Grid container spacing={5}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Old Promo"
              variant="outlined"
              name="oldPromo"
              value={values.oldPromo || ''}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="New Promo"
              variant="outlined"
              name="newPromo"
              value={values.newPromo || ''}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Skus"
              multiline
              fullWidth
              rows={5}
              name="skus"
              value={values.skus || ''}
              onChange={handleChange}
              variant="filled"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Sale Tag Description"
              variant="outlined"
              name="filterDescription"
              value={values.filterDescription || ''}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Promotional Skus"
              multiline
              fullWidth
              rows={5}
              name="promoSkus"
              value={values.promoSkus || ''}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </div>
      <Button
        className={classes.button}
        variant="contained"
        color="secondary"
        onClick={() => {
          handleResetValues();
          setPpa(false);
        }}
      >
        Reset
      </Button>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
};

export default Form;
