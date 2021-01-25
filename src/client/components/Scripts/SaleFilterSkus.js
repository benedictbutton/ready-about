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

const SaleFilterSkus = ({
  newPromo,
  promoSkus,
  filterDescription,
  ppa,
}) => {
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
        WHERE tg.Description = 'Storefront Filtering - Sale' AND
        t.Description = '
        <strong>
          <em>Filter Tag Description</em>
        </strong>
        ') FROM ProductPromotionAttribute WHERE (
        <strong>
          <em>(ProductId Selects here)</em>
        </strong>
        ) ) AND PromotionId = (SELECT PromotionId FROM Promotion WHERE
        Code = '
        <strong>
          <em>New Promo</em>
        </strong>
        '
      </Typography>
    </Grid>
  );

  const scripts = promoSkus.split('\n').map((sku, idx) => {
    return (
      <span key={sku}>
        {idx === 0 ? <br /> : 'OR '}
        ProductId = (SELECT ProductId FROM Product WHERE SKU = '
        <strong>{sku}</strong>
        ' )
        <br />
      </span>
    );
  });

  return (
    <>
      {!ppa ? (
        scriptCopy
      ) : (
        <Grid className={classes.grid}>
          <Typography
            className={classes.text}
            variant="body1"
            gutterBottom
          >
            INSERT INTO
            ProductPromotionAttributeTag(ProductPromotionAttributeId,
            TagId) SELECT ProductPromotionAttributeId, (SELECT t.TagId
            FROM Tag t JOIN TagGroup tg ON t.TagGroupId =
            tg.TagGroupId WHERE tg.Description = 'Storefront Filtering
            - Sale' AND t.Description = '{filterDescription}
            ') FROM ProductPromotionAttribute WHERE ({scripts}
) ) AND
            PromotionId = (SELECT PromotionId FROM Promotion WHERE
            Code = '
<strong>{newPromo}</strong>
            '
          </Typography>
        </Grid>
      )}
    </>
  );
};

export default SaleFilterSkus;
