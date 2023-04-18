import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import MyList from '../MyList';

const History = ({ user, lastItem, selected, handleClick }) => {
  const words = user?.wordsHistory.map(word => ({
    _id: word._id,
    item: word.text,
  }));

  return (
    <>
      {(words?.length && (
        <MyList
          listItems={words}
          lastItem={lastItem}
          selected={selected}
          handleClick={handleClick}
        />
      )) || <h1>Loading...</h1>}
    </>
  );
};

export default History;
