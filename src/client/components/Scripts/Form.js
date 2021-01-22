import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Script from './Scripts';
import useForm from '../CustomHooks';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  form: {
    marginTop: theme.spacing(1),
  },
}));

const Form = ({
  values,
  handleChange,
  handleSubmit,
  handleResetValues,
  ppa,
}) => {
  const classes = useStyles();
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className={classes.form}>
        <TextField
          id="outlined-basic"
          label="Old Promo"
          variant="outlined"
          name="oldPromo"
          value={values.oldPromo || ''}
          onChange={handleChange}
        />
        <TextField
          id="outlined-basic"
          label="New Promo"
          variant="outlined"
          name="newPromo"
          value={values.newPromo || ''}
          onChange={handleChange}
        />
        <TextField
          id="outlined-multiline-static"
          label="Skus"
          multiline
          rowsMax={20}
          name="skus"
          value={values.skus || ''}
          onChange={handleChange}
          variant="filled"
          variant="outlined"
        />
      </div>
      <Button
        className={classes.type}
        onClick={handleSubmit}
        color="primary"
      >
        Submit
      </Button>
      <Button
        className={classes.type}
        type="submit"
        onClick={handleResetValues}
        color="primary"
      >
        Reset
      </Button>
    </form>
  );
};

export default Form;
