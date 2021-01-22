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

  const displayScripts = () => {
    setPpa(true);
  };

  const {
    values,
    handleChange,
    handleResetValues,
    handleSubmit,
  } = useForm(displayScripts);

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
      />
      <Panels values={values} ppa={ppa} />
    </>
  );

  return <Main appBar={<MyAppBar />} main={scripts} />;
};

export default Script;

// INSERT INTO
// return <Main appBar={<MyAppBar />} main={selections} />;
// ProductPromotionAttributePromotionCategory(ProductPromotionAttributeId,
// PromotionCategoryId,
// SortOrder,    MobileSortOrder) SELECT (SELECT
// ProductPromotionAttributeId         FROM
// ProductPromotionAttribute         WHERE PromotionId = (SELECT
// PromotionId FROM Promotion WHERE Code = 'MLK21')         AND
// ProductId = (SELECT ProductId FROM Product WHERE SKU = '{sku}
// ')) AS [PromotionId],         ppapc.PromotionCategoryId,
//         ppapc.SortOrder,         ppapc.MobileSortOrder FROM
// ProductPromotionAttributePromotionCategory ppapc INNER JOIN
// ProductPromotionAttribute ppa ON
// ppapc.ProductPromotionAttributeId =
// ppa.ProductPromotionAttributeId WHERE (ppa.ProductId = (SELECT
// ProductId FROM Product WHERE SKU = '{sku}
// '))        AND ppa.PromotionId = (SELECT PromotionId FROM
// Promotion WHERE Code = 'DEFAULT17');
//
// OR ProductId = (SELECT ProductId FROM Product WHERE SKU = '
// {sku}
// '),
//

// GI505WBKIT
// S1000WBKT
// S3973DWBKT
// ZS352WBKT
// ZU562WBKT
// WV201WBKT
// ZS362WBKT
// ZU62WBKT
// NV501WBKT
// SV1106WKT
// RV1000
// NV150WBKT
// RV1001AE
// S6002WBKT
// CH951WBKT
// LA322WBKT
// LA502WBKT
// HZ2002WBKT
// QU201QBNWK
// IZ462HWBKT
// RV1000SWBK
// AZ1002WBKT
// AZ2002
// AZ2000W
// IZ162HWBKT
// AZ1003WBKT
// LZ601B4
// IZ142WBKT
// IX141WBKT
// WS620WBKT
// VM251WBKT
// VM251B1
// VM251B3
// RV761NP
// HV302NP
// RV2001NP
// RV2001WDNP
// ZU632WBK
