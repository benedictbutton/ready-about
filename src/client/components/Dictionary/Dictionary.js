import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Main from '../Main';
import DictionaryToolbar from './Toolbar';
import MyAppBar from '../AppBar/MyAppBar';
import EntryField from './EntryField';
import SubMenu from './SubMenu';
import useForm from '../../CustomHooks/useForm';
import useApi from '../../CustomHooks/useApi';
import Header from './Header';
import History from './History';

const useStyles = makeStyles(theme => ({
  grid: {
    marginLeft: theme.spacing(1),
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
}));

const GET_HISTORY = gql`
  query User {
    user {
      wordsHistory {
        text
      }
    }
  }
`;

const ADD_HISTORY = gql`
  mutation AddHistory($text: String!) {
    addHistory(text: $text) {
      text
    }
  }
`;

const Dictionary = () => {
  const classes = useStyles();
  const [activeLink, setActiveLink] = useState(false);
  const { loading, error, data } = useQuery(GET_HISTORY);
  const [addHistory, { client }] = useMutation(ADD_HISTORY, {
    update: updateHistory,
  });

  const searchWord = () => {
    doFetch(url);
    handleResetValues();
  };

  const {
    values,
    handleChange,
    handleSubmit,
    handleResetValues,
  } = useForm(searchWord);

  const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${values.word}?key=fcf2dd30-293b-4009-972c-dd69263cce7d`;
  const headers = {
    method: 'GET',
    headers: {
      // 'Content-Type': 'application/json',
    },
  };

  const [{ apiData, isLoading, isError }, doFetch] = useApi(
    '',
    headers,
  );

  const updateHistory = (client, { data }) => {
    const { user: wordsHistory } = client.readQuery({
      query: GET_HISTORY,
    });

    const newWord = apiData[0].meta.id;
    client.writeQuery({
      query: GET_HISTORY,
      data: { history: [newWord, ...wordsHistory] },
    });
  };

  useEffect(() => {
    if (!apiData) return;
    if (apiData[0].meta)
      addHistory({ variables: { text: apiData[0].meta.id } });
  }, [addHistory, apiData]);

  let senses = [];
  if (apiData) {
    if (apiData[0] instanceof Object) {
      senses = apiData.map((meta, idx) => {
        // if (!meta.hom) return null;
        if (!meta.fl) return null;
        return (
          <>
            <Grid item xs={12} key={idx} className={classes.fl}>
              <Typography variant="h6" align="left">
                <em>{meta.fl}</em>
              </Typography>
            </Grid>

            {meta.shortdef.map((sense, index) => (
              <>
                <Grid item xs={1} key={index} className={classes.def}>
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
      senses = apiData.map((word, idx) => {
        return (
          <>
            <Grid item xs={12} key={idx} className={classes.fl}>
              <Typography variant="body1" align="left">
                {word}
              </Typography>
            </Grid>
          </>
        );
      });
    }
  }
  console.log(data);
  // <History words={data} />
  const definition = !apiData ? (
    <History user={data?.user} />
  ) : (
    <Grid container className={classes.grid} justify="flex-start">
      <Grid item xs={12} align="left">
        <Header apiData={apiData} />
      </Grid>
      {senses}
    </Grid>
  );

  return (
    <Main
      appBar={<MyAppBar />}
      main={definition}
      textField={
        <Grid container justify="space-around" alignItems="center">
          <Grid item xs={3} className={classes.subMenu}>
            <SubMenu
              activeLink={activeLink}
              setActiveLink={setActiveLink}
              topMenuOption="Dictionary"
              bottomMenuOption="Thesaurus"
            />
          </Grid>
          <Grid item xs={4}>
            <EntryField
              values={values}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </Grid>
          <Grid item xs={3} className={classes.subMenu}>
            <SubMenu
              activeLink={activeLink}
              setActiveLink={setActiveLink}
              topMenuOption="History"
              bottomMenuOption="Favorites"
            />
          </Grid>
        </Grid>
      }
    />
  );
};

export default Dictionary;
