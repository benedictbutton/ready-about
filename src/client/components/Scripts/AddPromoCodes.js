import React, { useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles(theme => ({
  text: {},
  root: {
    marginBottom: '0px',
  },
  grid: { marginTop: theme.spacing(2) },
  item: {
    marginLeft: '8px',
  },
  button: {
    // border: '5px solid blue',
  },
}));

const AddPromoCodes = ({
  values,
  handleChange,
  ppa,
  promoValues,
  handlePromoValues,
  handleUnitValue,
  handleAddPromoFields,
}) => {
  const classes = useStyles(promoValues.unit);

  console.log(promoValues);
  console.log(values);

  let count = 0;
  const data = promoValues.map((input, idx) => {
    count++;
    return (
      <React.Fragment key={count}>
        <Grid
          container
          className={classes.grid}
          justify="space-around"
        >
          <Grid item xs={5}>
            <TextField
              fullWidth
              multiline
              rows={5}
              id="outlined-basic"
              label="Sale Skus"
              variant="outlined"
              name="skus"
              value={input.skus || ''}
              onChange={() => handlePromoValues(event, idx)}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Code"
              variant="outlined"
              name="code"
              value={input.code || ''}
              onChange={() => handlePromoValues(event, idx)}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              className={classes.root}
              label="Discount"
              variant="outlined"
              name="discount"
              value={input.discount || ''}
              onChange={() => handlePromoValues(event, idx)}
            />
            <Grid container>
              <Grid item xs={5} className={classes.item} align="left">
                <Button
                  variant={
                    input.unit === '$' ? 'contained' : 'outlined'
                  }
                  color={input.unit === '$' ? 'primary' : 'default'}
                  name="unit"
                  value="$"
                  onClick={() => handleUnitValue(event, idx, '$')}
                >
                  $
                </Button>
                <Button
                  variant={
                    input.unit === '%' ? 'contained' : 'outlined'
                  }
                  color={input.unit === '%' ? 'primary' : 'default'}
                  name="unit"
                  value="%"
                  onClick={() => handleUnitValue(event, idx, '%')}
                >
                  %
                </Button>
              </Grid>
              <Grid item xs={5}>
                <IconButton
                  aria-label="Add"
                  onClick={handleAddPromoFields}
                >
                  <AddCircleIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  });

  return (
    <>
      <Grid container spacing={1}>
        {data}
      </Grid>
    </>
  );
};

export default AddPromoCodes;
