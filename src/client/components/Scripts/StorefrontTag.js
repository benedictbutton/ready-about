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

const StorefrontTag = ({ newPromo }) => {
  const classes = useStyles();
  return (
    <>
      <Grid container>
        {' '}
        <Grid item xs={12} className={classes.grid}>
          <Typography
            className={classes.text}
            variant="body1"
            gutterBottom
          >
            INSERT INTO Tag(TagGroupId, Description, IsPublished)
            <br />
            VALUES((SELECT TagGroupId FROM TagGroup WHERE Description
            = 'Storefront Filtering - Sale'), '
            <strong>{newPromo || <em>New Promo</em>}</strong>
            ', 1);
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default StorefrontTag;
