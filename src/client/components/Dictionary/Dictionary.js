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
  const [activeLink] = useState(false);
  const { data } = useQuery(GET_HISTORY);
  const [addHistory] = useMutation(ADD_HISTORY, {
    refetchQueries: [{ query: GET_HISTORY }],
  });
  const [deleteWords] = useMutation(DELETE_WORDS, {
    update: cache => {
      cache.updateQuery({ query: GET_HISTORY }, data => ({
        user: {
          ...data.user,
          wordsHistory: data.user.wordsHistory.filter(
            word => word._id !== selected[0],
          ),
        },
      }));
    },
    onCompleted: () => handleResetSelected(),
  });

  const baseUrl = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/`;
  const key = `?key=${process.env.DICTIONARY_API}`;
  const getUrl = (urlRoot, word, urlKey) => urlRoot + word + urlKey;

  const searchWord = values => {
    setOpenHistory(false);
    doFetch(getUrl(baseUrl, values?.word, key));
    handleResetValues();
  };

  const {
    values,
    handleChange,
    handleSubmit,
    handleResetValues,
  } = useForm(searchWord);

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

  const words = useMemo(() => {
    return data?.user?.wordsHistory.map(word => ({
      _id: word._id,
      item: word.text,
    }));
  }, [data]);

  const {
    selected,
    handleClick,
    handleSelectAllClick,
    handleResetSelected,
    handleSelectSubmit,
  } = useSelectList(words, searchWord);

  const wordPages = [];
  for (let i = 0; i <= words?.length; i += 10) {
    wordPages.push(words.slice(i, i + 10));
  }

  const history = useMemo(
    () =>
      wordPages.map((wordList, idx) => {
        return (
          <div key={idx} data-density="hard">
            <History
              words={wordList}
              lastItem={el => (lastItem.current = el)}
              selected={selected}
              handleClick={handleClick}
            />
          </div>
        );
      }),
    [handleClick, selected, wordPages],
  );

  const flipbook = useRef(null);
  const flipBack = () => {
    flipbook.current.pageFlip().flipPrev();
  };

  const flipTo = page => {
    flipbook.current.pageFlip().flip(page * 2);
  };

  const flipForward = () => {
    flipbook.current.pageFlip().flipNext();
  };

  const definition =
    !apiData || openHistory ? (
      <PageFlip ref={flipbook}>{history}</PageFlip>
    ) : (
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
          handleSelectSubmit={handleSelectSubmit}
        />
      }
      main={definition}
      textField={
        <Grid
          container
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid item xs={3} className={classes.subMenu}>
            {/* <SubMenu
              activeLink={activeLink}
              bottomMenuOption="Thesaurus"
              doFetch={doFetch}
            /> */}
          </Grid>
          <Grid item xs={5}>
            <EntryField
              values={values}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </Grid>
          <Grid item xs={3} className={classes.subMenu}>
            <SubMenu
              activeLink={activeLink}
              bottomMenuOption="Favorites"
              setOpenHistory={setOpenHistory}
            />
          </Grid>
        </Grid>
      }
      pagination={
        <Paginate
          flipForward={flipForward}
          flipBack={flipBack}
          flipTo={flipTo}
          pageCount={Math.ceil(words?.length / 20)}
          previousLabel="Prev"
          nextLabel="Next"
        />
      }
    />
  );
};

export default Dictionary;
