import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useForm from '../../CustomHooks/useForm';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  button: {
    margin: theme.spacing(1),
  },
  form: {
    marginTop: theme.spacing(1),
  },
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
  def: {
    marginLeft: theme.spacing(4),
  },
  subMenu: {
    margin: theme.spacing(2),
  },
}));

const SalePromo = ({ newPromo, promoValues, ppa }) => {
  const classes = useStyles();

  const scriptCopy = (
    <Grid item xs={12} className={classes.grid}>
      <Typography
        className={classes.text}
        variant="body1"
        gutterBottom
      >
        INSERT INTO
        ProductPromotionAttributePromotionCategory(ProductPromotionAttributeId,PromotionCategoryId)
        SELECT ProductPromotionAttributeId, (SELECT
        PromotionCategoryId FROM PromotionCategory WHERE Name LIKE
        'Sale') AS [PromotionCategoryId] FROM
        ProductPromotionAttribute WHERE (ProductId = (SELECT ProductId
        FROM Product WHERE SKU = '
        <strong>
          <em>purchase page sku</em>
        </strong>
        '))
        <br /> AND PromotionId = (SELECT PromotionId FROM Promotion
        WHERE Code = '
        <strong>
          <em>New Promo</em>
        </strong>
        ');
      </Typography>
    </Grid>
  );

  const scripts = promoValues.map(obj => {
    return obj.skus.split('\n').map(sku => {
      return (
        <Grid item xs={12} key={sku} className={classes.grid}>
          <Typography
            variant="h5"
            component="h1"
            className={classes.sku}
          >
            {ppa && <span>-- </span>}
            <span style={{ textDecoration: 'underline' }}>{sku}</span>
          </Typography>
          <Typography
            className={classes.text}
            variant="body1"
            gutterBottom
          >
            INSERT INTO
            ProductPromotionAttributePromotionCategory(ProductPromotionAttributeId,PromotionCategoryId)
            SELECT ProductPromotionAttributeId, (SELECT
            PromotionCategoryId FROM PromotionCategory WHERE Name LIKE
            'Sale') AS [PromotionCategoryId] FROM
            ProductPromotionAttribute WHERE (ProductId = (SELECT
            ProductId FROM Product WHERE SKU = '<strong>{sku}</strong>
            '))
            <br /> AND PromotionId = (SELECT PromotionId FROM
            Promotion WHERE Code = '<strong>{newPromo}</strong>
            ');
          </Typography>
        </Grid>
      );
    });
  });

  return (
    <Grid container>{(!ppa && scriptCopy) || (ppa && scripts)}</Grid>
  );
};

export default SalePromo;
