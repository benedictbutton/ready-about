import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Main from '../Main';
import MyAppBar from '../AppBar/MyAppBar';
import EntryField from './EntryField';
import SubMenu from './SubMenu';
import useApi from '../../CustomHooks/useApi';
import useForm from '../../CustomHooks/useForm';
import useSelectList from '../../CustomHooks/useSelectList';
import Header from './Header';
import History from './History';
import PageFlip from '../PageFlip';
import Paginate from '../Paginate';

const useStyles = makeStyles(theme => ({
  grid: {
    marginLeft: theme.spacing(1),
    overflow: 'auto',
    height: '100%',
  },
  fl: {
    marginLeft: theme.spacing(2),
  },
  def: {
    marginLeft: theme.spacing(4),
  },
  subMenu: {
    margin: theme.spacing(2),
  },
  pagination: {
    display: 'flex',
    listStyle: 'none',
  },
  pageLink: {
    position: 'relative',
    display: 'block',
    color: '#0d6efd',
    textDecoration: 'none',
    backgroundColor: '#fff',
    border: '1px solid #dee2e6',
    transition:
      'color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out',
    padding: '.375rem .75rem',
  },
  active: {
    zIndex: 3,
    color: '#fff',
    backgroundColor: '#0d6efd',
    borderColor: '#0d6efd',
  },
}));

const Definition = ({ apiData, addHistory }) => {
  const classes = useStyles();

  useEffect(() => {
    if (!apiData) return;
    if (apiData[0].meta) {
      let word = apiData[0].meta.id;
      if (word[word.length - 2] === ':') word = word.slice(0, -2);
      addHistory({ variables: { text: word } });
    }
  }, [addHistory, apiData]);

  let senses = [];
  if (apiData) {
    if (apiData[0] instanceof Object) {
      senses = apiData.map(meta => {
        if (!meta.fl) return null;
        return (
          <>
            <Grid item xs={12} key={uuidv4()} className={classes.fl}>
              <Typography variant="h6" align="left">
                <em>{meta.fl}</em>
              </Typography>
            </Grid>

            {meta.shortdef.map((sense, index) => (
              <>
                <Grid
                  item
                  xs={1}
                  key={uuidv4()}
                  className={classes.def}
                >
                  <Typography variant="body1" align="center">
                    {index + 1}
                    {'. '}
                  </Typography>
                </Grid>
                <Grid item xs={10} align="left">
                  <Typography variant="body1" align="left">
                    {sense}
                  </Typography>
                </Grid>
              </>
            ))}
          </>
        );
      });
    } else {
      senses = apiData.map(word => {
        return (
          <>
            <Grid item xs={12} key={uuidv4()} className={classes.fl}>
              <Typography variant="body1" align="left">
                {word}
              </Typography>
            </Grid>
          </>
        );
      });
    }
  }

  // const definition =
  //     !apiData || openHistory ? (
  //       <PageFlip ref={flipbook}>{history}</PageFlip>
  //     ) : (
  //       <Grid
  //         container
  //         className={classes.grid}
  //         justifyContent="flex-start"
  //         alignContent="flex-start"
  //       >
  //         <Grid item xs={12} align="left">
  //           <Header apiData={apiData} />
  //         </Grid>
  //         {senses}
  //       </Grid>
  //     );

  return (
    <Grid
      container
      className={classes.grid}
      justifyContent="flex-start"
      alignContent="flex-start"
    >
      <Grid item xs={12} align="left">
        <Header apiData={apiData} />
      </Grid>
      {senses}
    </Grid>
  );
};

export default Definition;
