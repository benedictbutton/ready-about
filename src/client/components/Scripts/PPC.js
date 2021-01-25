import React, { useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
  def: {
    marginLeft: theme.spacing(4),
  },
  subMenu: {
    margin: theme.spacing(2),
  },
}));

const PPC = ({ oldPromo, newPromo, skus, ppa }) => {
  const classes = useStyles();
  const text = useRef(null);

  const selectAll = event => {
    window.getSelection().selectAllChildren(text.current);
  };

  const scriptCopy = (
    <Grid item xs={12} className={classes.grid}>
      <Typography
        className={classes.text}
        variant="body1"
        gutterBottom
      >
        INSERT INTO
        ProductPromotionContext(ProductPromotionAttributeId, Code,
        BlockName, TitleOverride, OfferUrlOverride,
        MobileOfferUrlOverride, DetailUrlOverride,
        MobileDetailUrlOverride, SortOrderOverride,
        MobileSortOrderOverride, DescriptionOverride) SELECT (SELECT
        ProductPromotionAttributeId FROM ProductPromotionAttribute
        WHERE PromotionId = (SELECT PromotionId FROM Promotion WHERE
        Code = '
        <strong>
          <em>New Promo</em>
        </strong>
        ') AND ProductId = (SELECT ProductId FROM Product WHERE SKU =
        '
        <strong>
          <em>sku</em>
        </strong>
        ')) AS [ProductPromotionAttributeId], ppc.Code, ppc.BlockName,
        ppc.TitleOverride, ppc.OfferUrlOverride,
        ppc.MobileOfferUrlOverride, ppc.DetailUrlOverride,
        ppc.MobileDetailUrlOverride, ppc.SortOrderOverride,
        ppc.MobileSortOrderOverride, ppc.DescriptionOverride FROM
        ProductPromotionContext ppc INNER JOIN
        ProductPromotionAttribute ppa ON
        ppc.ProductPromotionAttributeId =
        ppa.ProductPromotionAttributeId WHERE (ppa.ProductId = (SELECT
        ProductId FROM Product WHERE SKU = '
        <strong>
          <em>sku</em>
        </strong>
        ')) AND ppa.PromotionId = (SELECT PromotionId FROM Promotion
        WHERE Code = '
        <strong>
          <em>Old Promo</em>
        </strong>
        ');
      </Typography>
    </Grid>
  );

  const scripts = skus.split('\n').map(sku => {
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
          ProductPromotionContext(ProductPromotionAttributeId, Code,
          BlockName, TitleOverride, OfferUrlOverride,
          MobileOfferUrlOverride, DetailUrlOverride,
          MobileDetailUrlOverride, SortOrderOverride,
          MobileSortOrderOverride, DescriptionOverride) SELECT (SELECT
          ProductPromotionAttributeId FROM ProductPromotionAttribute
          WHERE PromotionId = (SELECT PromotionId FROM Promotion WHERE
          Code = '<strong>{newPromo}</strong>
          ') AND ProductId = (SELECT ProductId FROM Product WHERE SKU
          = '<strong>{sku}</strong>
          ')) AS [ProductPromotionAttributeId], ppc.Code,
          ppc.BlockName, ppc.TitleOverride, ppc.OfferUrlOverride,
          ppc.MobileOfferUrlOverride, ppc.DetailUrlOverride,
          ppc.MobileDetailUrlOverride, ppc.SortOrderOverride,
          ppc.MobileSortOrderOverride, ppc.DescriptionOverride FROM
          ProductPromotionContext ppc INNER JOIN
          ProductPromotionAttribute ppa ON
          ppc.ProductPromotionAttributeId =
          ppa.ProductPromotionAttributeId WHERE (ppa.ProductId =
          (SELECT ProductId FROM Product WHERE SKU = '
          <strong>{sku}</strong>
          ')) AND ppa.PromotionId = (SELECT PromotionId FROM Promotion
          WHERE Code = '<strong>{oldPromo}</strong>
          ');
        </Typography>
      </Grid>
    );
  });

  return (
    <>
      <Grid container ref={text}>
        <Grid align="right" item xs={12}>
          <Button color="primary" onClick={selectAll}>
            Select All
          </Button>
        </Grid>
        {(!ppa && scriptCopy) || scripts}
      </Grid>
    </>
  );
};

export default PPC;
