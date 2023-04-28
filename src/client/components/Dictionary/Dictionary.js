import React, { useState, useEffect, useRef } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import ReactPaginate from 'react-paginate';
import { v4 as uuidv4 } from 'uuid';
import usePagination from '../../CustomHooks/usePagination';
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

const DELETE_WORDS = gql`
  mutation DeleteWords($_id: [ID]!) {
    deleteWords(_id: $_id) {
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
  const [deleteWords] = useMutation(DELETE_WORDS, {
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

  const words = data?.user?.wordsHistory.map(word => ({
    _id: word._id,
    item: word.text,
  }));

  const { itemsPerPage, currentItems, paginate } = usePagination(
    words,
  );

  const definition =
    !apiData || openHistory ? (
      <History
        words={currentItems}
        lastItem={el => (lastItem.current = el)}
        selected={selected}
        handleClick={handleClick}
      />
    ) : (
      <Grid
        container
        className={classes.grid}
        justifyContent="flex-start"
      >
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
          deleteWords={deleteWords}
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
      pagination={
        <ReactPaginate
          onPageChange={paginate}
          pageCount={Math.ceil(words?.length / itemsPerPage)}
          previousLabel={'Prev'}
          nextLabel={'Next'}
          renderOnZeroPageCount={null}
          className="react-paginate"
        />
      }
    />
  );
};

export default Dictionary;
