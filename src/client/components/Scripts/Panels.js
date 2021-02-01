import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import SkuCollection from './SkuCollection';
import PPA from './PPA';
import PPC from './PPC';
import PromoCodes from './PromoCodes';
import SalePromo from './SalePromo';
import StorefrontCategories from './StorefrontCategories';
import StorefrontTag from './StorefrontTag';
import SaleFilterSkus from './SaleFilterSkus';
import Scripts from './Scripts';
import Main from '../Main';
import MyAppBar from '../AppBar/MyAppBar';
import useForm from '../CustomHooks';

const useStyles = makeStyles(theme => ({
  type: {
    width: '100%',
    textAlign: 'center',
    fontWeight: 700,
  },
}));

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

export default function Panels({
  values,
  ppa,
  handleChange,
  promoValues,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState('panel1');

  const handlePanel = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        square
        expanded={expanded === 'panel1'}
        onChange={handlePanel('panel1')}
      >
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          <Typography className={classes.type} component="h6">
            COLLECT SKUS FROM PREVIOUS PROMO{' '}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SkuCollection
            promo={values.promo || ''}
            handleChange={handleChange}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === 'panel2'}
        onChange={handlePanel('panel2')}
      >
        <AccordionSummary
          aria-controls="panel2d-content"
          id="panel2d-header"
        >
          <Typography className={classes.type} component="h6">
            COPY PPA TO NEW PROMOTION{' '}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PPA
            oldPromo={values.oldPromo}
            newPromo={values.newPromo}
            skus={values.skus || ''}
            ppa={ppa}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === 'panel3'}
        onChange={handlePanel('panel3')}
      >
        <AccordionSummary
          aria-controls="panel3d-content"
          id="panel3d-header"
        >
          <Typography className={classes.type} component="h6">
            COPY PPC TO NEW PROMOTION{' '}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PPC
            oldPromo={values.oldPromo}
            newPromo={values.newPromo}
            skus={values.skus || ''}
            ppa={ppa}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === 'panel4'}
        onChange={handlePanel('panel4')}
      >
        <AccordionSummary
          aria-controls="panel4d-content"
          id="panel4d-header"
        >
          <Typography className={classes.type} component="h6">
            COPY PROMOTION CATEGORIES (AKA STOREFRONT CATEGORIES){' '}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <StorefrontCategories
            oldPromo={values.oldPromo}
            newPromo={values.newPromo}
            skus={values.skus || ''}
            ppa={ppa}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === 'panel5'}
        onChange={handlePanel('panel5')}
      >
        <AccordionSummary
          aria-controls="panel5d-content"
          id="panel5d-header"
        >
          <Typography className={classes.type} component="h6">
            ADD SALE PROMO TO PRODUCTS INDICATED
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SalePromo
            newPromo={values.newPromo}
            promoSkus={values.promoSkus || ''}
            ppa={ppa}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === 'panel6'}
        onChange={handlePanel('panel6')}
      >
        <AccordionSummary
          aria-controls="panel6d-content"
          id="panel6d-header"
        >
          <Typography className={classes.type} component="h6">
            INSERT SALE TAG FOR STOREFRONT FILTERING
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <StorefrontTag
            filterDescription={values.filterDescription}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === 'panel7'}
        onChange={handlePanel('panel7')}
      >
        <AccordionSummary
          aria-controls="panel7d-content"
          id="panel7d-header"
        >
          <Typography className={classes.type} component="h6">
            INSERT PPA TO SALE FILTER (FOR PRODUCTS PROMOTED)
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SaleFilterSkus
            newPromo={values.newPromo}
            promoSkus={values.promoSkus || ''}
            filterDescription={values.filterDescription}
            ppa={ppa}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === 'panel8'}
        onChange={handlePanel('panel8')}
      >
        <AccordionSummary
          aria-controls="panel8d-content"
          id="panel8d-header"
        >
          <Typography className={classes.type} component="h6">
            PPA TAG, CODE, & DISCOUNT
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PromoCodes
            newPromo={values.newPromo}
            promoValues={promoValues}
            ppa={ppa}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

// <PromoTag oldPromo={values.oldPromo}
// newPromo={values.newPromo}
// skus={values.skus || ''}
// ppa={ppa}/>
