import React, { useState, useEffect, useRef } from 'react';
import {
  gql,
  useQuery,
  useMutation,
  useApolloClient,
} from '@apollo/client';
import Main from '../Main';
import MyAppBar from '../AppBar/MyAppBar';
import EntryField from './EntryField';
import SubMenu from './SubMenu';
import useForm from '../../CustomHooks/useForm';
import useApi from '../../CustomHooks/useApi';
import Header from './Header';
import History from './History';
// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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
        _id
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

const DELETE_WORD = gql`
  mutation DeleteWord($_id: ID!) {
    deleteWord(_id: $_id) {
      wordsHistory {
        _id
        text
      }
    }
  }
`;

const Dictionary = () => {
  const classes = useStyles();
  const lastItem = useRef(null);
  const [openHistory, setOpenHistory] = useState(true);
  const [activeLink, setActiveLink] = useState(false);
  const { loading, error, data } = useQuery(GET_HISTORY);
  const [addHistory, { client }] = useMutation(ADD_HISTORY, {
    refetchQueries: [{ query: GET_HISTORY }],
  });
  const [deleteWord] = useMutation(DELETE_WORD, {
    refetchQueries: [{ query: GET_HISTORY }],
  });

  const {
    selected,
    handleClick,
    handleSelectAllClick,
    handleResetSelected,
    handleKeyUp,
    handleKeyDown,
  } = useForm();

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [handleKeyUp]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const searchWord = () => {
    setOpenHistory(false);
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

  // const updateHistory = (client, { data }) => {
  //   const { user: wordsHistory } = client.readQuery({
  //     query: GET_HISTORY,
  //   });

  //   const newWord = apiData[0].meta.id;
  //   if (newWord[newWord.length - 2] === ':')
  //     newWord = newWord.slice(0, -2);
  //   client.writeQuery({
  //     query: GET_HISTORY,
  //     data: { history: [newWord, ...wordsHistory] },
  //   });
  // };

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
      senses = apiData.map((meta, idx) => {
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

  const definition =
    !apiData || openHistory ? (
      <History
        user={data?.user}
        lastItem={el => (lastItem.current = el)}
        selected={selected}
        handleClick={handleClick}
      />
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
      appBar={
        <MyAppBar
          numSelected={selected.length}
          numOfWords={data?.user?.wordsHistory?.length}
          words={data?.user?.wordsHistory}
          onSelectAllClick={handleSelectAllClick}
          deleteWord={deleteWord}
          selected={selected}
          handleResetSelected={handleResetSelected}
        />
      }
      main={definition}
      textField={
        <Grid container justify="space-around" alignItems="center">
          <Grid item xs={3} className={classes.subMenu}>
            <SubMenu
              activeLink={activeLink}
              setActiveLink={setActiveLink}
              topMenuOption="Dictionary"
              bottomMenuOption="Thesaurus"
              doFetch={doFetch}
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
              setOpenHistory={setOpenHistory}
            />
          </Grid>
        </Grid>
      }
    />
  );
};

export default Dictionary;
