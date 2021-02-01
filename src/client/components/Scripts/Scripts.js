import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Main from '../Main';
import MyAppBar from '../AppBar/MyAppBar';
import Form from './Form';
import Panels from './Panels';
import useForm from '../CustomHooks';

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
    padding: theme.spacing(2),
  },
  def: {
    marginLeft: theme.spacing(4),
  },
  subMenu: {
    margin: theme.spacing(2),
  },
}));

const Script = () => {
  const classes = useStyles();
  const [ppa, setPpa] = useState(false);
  const [promoValues, setPromoValues] = useState([
    { skus: '', code: '', discount: '', unit: '$' },
  ]);

  const displayScripts = () => {
    setPpa(true);
  };

  const {
    values,
    handleChange,
    handleResetValues,
    handleSubmit,
  } = useForm(displayScripts);

  const handlePromoValues = (event, idx) => {
    setPromoValues(() => {
      const newPromoValues = promoValues.map((obj, i) => {
        if (i !== idx) return obj;
        return {
          ...obj,
          [event.target.name]: event.target.value,
        };
      });
      return newPromoValues;
    });
  };

  const handleUnitValue = (event, idx, unitValue) => {
    setPromoValues(() => {
      const newPromoValues = promoValues.map((obj, i) => {
        if (i !== idx) return obj;
        return {
          ...obj,
          unit: unitValue,
        };
      });
      return newPromoValues;
    });
  };

  const handleAddPromoFields = () => {
    setPromoValues(() =>
      promoValues.concat([
        { skus: '', code: '', discount: '', unit: '$' },
      ]),
    );
  };

  useEffect(() => {
    if (!ppa) return;
    displayScripts();
  }, [ppa]);

  const scripts = (
    <>
      <Form
        values={values}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleResetValues={handleResetValues}
        ppa={ppa}
        setPpa={setPpa}
        promoValues={promoValues}
        handlePromoValues={handlePromoValues}
        handleUnitValue={handleUnitValue}
        handleAddPromoFields={handleAddPromoFields}
      />
      <Panels
        values={values}
        ppa={ppa}
        handleChange={handleChange}
        promoValues={promoValues}
      />
    </>
  );

  return <Main appBar={<MyAppBar />} main={scripts} />;
};

export default Script;

// GI505WBKIT;
// S1000WBKT;
// S3973DWBKT;
// ZS352WBKT;
// WV201WBKT;
// ZU562WBKT;
// ZS362WBKT;
// ZU62WBKT;
// NV501WBKT;
// SV1106WKT;
// RV1000;
// NV150WBKT;
// RV1001AE;
// S6002WBKT;
// CH951WBKT;
// LA322WBKT;
// LA502WBKT;
// HZ2002WBKT;
// QU201QBNWK;
// IZ462HWBKT;
// RV1000SWBK;
// AZ1002WBKT;
// AZ2002;
// AZ2000W;
// IZ162HWBKT;
// AZ1003WBKT;
// LZ601B4;
// IZ142WBKT;
// IX141WBKT;
// WS620WBKT;
// VM251WBKT;
// VM251B1;
// VM251B3;
// RV761NP;
// HV302NP;
// RV2001NP;
// RV2001WDNP;
// ZU632WBK;
