import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import PPA from './PPA';
import PPC from './PPC';
import Scripts from './Scripts';
import Main from '../Main';
import MyAppBar from '../AppBar/MyAppBar';
import useForm from '../CustomHooks';

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

export default function Panels({ values, ppa }) {
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
          <Typography>PPA</Typography>
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
        expanded={expanded === 'panel2'}
        onChange={handlePanel('panel2')}
      >
        <AccordionSummary
          aria-controls="panel2d-content"
          id="panel2d-header"
        >
          <Typography>PPC</Typography>
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
        expanded={expanded === 'panel3'}
        onChange={handlePanel('panel3')}
      >
        <AccordionSummary
          aria-controls="panel3d-content"
          id="panel3d-header"
        >
          <Typography>Collapsible Group Item #3</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Suspendisse malesuada lacus ex, sit amet blandit leo
            lobortis eget. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Suspendisse malesuada lacus ex, sit amet
            blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
