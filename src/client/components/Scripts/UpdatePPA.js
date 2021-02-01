import React, { useState, useEffect, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  sku: {
    textAlign: 'left',
    fontWeight: 800,
    marginLeft: theme.spacing(1),
  },
  grid: {
    padding: theme.spacing(1),
  },
  text: {
    textAlign: 'left',
    padding: theme.spacing(2),
  },
}));

const UpdatePPA = ({ promoValues, newPromo, ppa }) => {
  const classes = useStyles();
  const text = useRef(null);

  const selectAll = event => {
    window.getSelection().selectAllChildren(text.current);
  };

  const scriptCopy = (
    <Grid className={classes.grid}>
      <Typography
        className={classes.text}
        variant="body1"
        gutterBottom
      >
        UPDATE ProductPromotionAttribute set promoCode = '
        <strong>
          <em>Promo Code</em>
        </strong>
        ', discountValue ={' '}
        <strong>
          <em>Discount Value</em>
        </strong>
        <br />
        WHERE (
        <strong>
          <em>ProductId Selects here</em>
        </strong>
        ) ) AND PromotionId = (SELECT PromotionId FROM Promotion WHERE
        Code = '
        <strong>
          <em>New Promo</em>
        </strong>
        ');
      </Typography>
    </Grid>
  );

  const scripts = promoValues.map((obj, idx) => {
    return (
      <Grid item xs={12} key={idx}>
        <Typography
          className={classes.text}
          variant="body1"
          gutterBottom
        >
          UPDATE ProductPromotionAttribute set promoCode = '
          <strong>{obj.code}</strong>
          ', discountValue = '<strong>{obj.discount}</strong>
' WHERE (
{obj.skus.split('\n').map((sku, i) => (
            <span key={sku}>
              {i === 0 ? <br /> : 'OR '}
              ProductId = (SELECT ProductId FROM Product WHERE SKU = '
              <strong>{sku}</strong>
              ' )
              <br />
            </span>
          ))}
          ) AND PromotionId = (SELECT PromotionId FROM Promotion WHERE
          Code = '<strong>{newPromo}</strong>
          ');
        </Typography>
      </Grid>
    );
  });

  return (
    <>
      {!ppa ? (
        scriptCopy
      ) : (
        <Grid container className={classes.grid} ref={text}>
          <Grid align="right" item xs={12}>
            <Button color="primary" onClick={selectAll}>
              Select All
            </Button>
          </Grid>
          {scripts}
        </Grid>
      )}
    </>
  );
};

export default UpdatePPA;
