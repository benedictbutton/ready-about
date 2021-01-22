import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
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
  def: {
    marginLeft: theme.spacing(4),
  },
  subMenu: {
    margin: theme.spacing(2),
  },
}));

const PPA = ({ oldPromo, newPromo, skus, ppa }) => {
  const classes = useStyles();

  const scripts = skus.split('\n').map((sku, idx) => {
    return (
      <span key={sku}>
        {idx === 0 ? '' : 'OR '}
        ProductId = (SELECT ProductId FROM Product WHERE SKU = '
        <strong>{sku}</strong>
        ' )
        <br />
      </span>
    );
  });

  return (
    <Grid className={classes.grid}>
      <Typography
        className={classes.text}
        variant="body1"
        gutterBottom
      >
        INSERT INTO ProductPromotionAttribute(PromotionId, ProductId,
        WarrantyTypeId, MSRP, MSRPOverride, Shipping,
        HasPriorityProcessing, Title, Description, OfferUrl,
        MobileOfferUrl, SortOrder, DiscountValue, PromoCode,
        GuaranteeTypeId) SELECT (SELECT PromotionId FROM Promotion
        WHERE Code = '{newPromo || <em>New Promo</em>}
        ') AS [PromotionId], ProductId, WarrantyTypeId, MSRP,
        MSRPOverride, Shipping, HasPriorityProcessing, Title,
        Description, OfferUrl, MobileOfferUrl, SortOrder,
        DiscountValue, PromoCode, GuaranteeTypeId FROM
        ProductPromotionAttribute WHERE ({scripts || null}
) AND
        PromotionId = (SELECT PromotionId FROM Promotion WHERE Code =
        '
{oldPromo || <em>Old Promo</em>}
        '
      </Typography>
    </Grid>
  );
};

export default PPA;
