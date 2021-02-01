import React from 'react';
import Grid from '@material-ui/core/Grid';
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

const PromoCodes = ({ promoValues, newPromo, ppa }) => {
  const classes = useStyles();

  const scriptCopy = (
    <Grid className={classes.grid}>
      <Typography
        className={classes.text}
        variant="body1"
        gutterBottom
      >
        INSERT INTO
        ProductPromotionAttributeTag(ProductPromotionAttributeId,
        TagId) SELECT ProductPromotionAttributeId, (SELECT t.TagId
        FROM Tag t JOIN TagGroup tg ON t.TagGroupId = tg.TagGroupId
        WHERE tg.Description = 'Product Pod Promo Messaging' AND
        t.Description = '
        <strong>
          <em>PPA Tag</em>
        </strong>
        ') FROM ProductPromotionAttribute WHERE (
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
    const ppaTag =
      obj.unit === '%'
        ? '{{discountValue}}% off<sup>†</sup> with promo code <strong>{{promoCode}}</strong>'
        : '${{discountValue}} off<sup>†</sup> with promo code <strong>{{promoCode}}</strong>';
    return (
      <Grid item xs={12} key={idx}>
        <Typography
          className={classes.text}
          variant="body1"
          gutterBottom
        >
          INSERT INTO
          ProductPromotionAttributeTag(ProductPromotionAttributeId,
          TagId) SELECT ProductPromotionAttributeId, (SELECT t.TagId
          FROM Tag t JOIN TagGroup tg ON t.TagGroupId = tg.TagGroupId
          WHERE tg.Description = 'Product Pod Promo Messaging' AND
          t.Description = '<strong>{ppaTag}</strong>
          ') FROM ProductPromotionAttribute WHERE (
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

  const ppaTag =
    'percent' === 'percent'
      ? '{{discountValue}}% off<sup>†</sup> with promo code <strong>{{promoCode}}</strong>'
      : '${{discountValue}} off<sup>†</sup> with promo code <strong>{{promoCode}}</strong>';

  return (
    <>
      {!ppa ? (
        scriptCopy
      ) : (
        <Grid container className={classes.grid}>
          {scripts}
        </Grid>
      )}
    </>
  );
};

export default PromoCodes;
