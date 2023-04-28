import React from 'react';
import MyList from '../MyList';

const History = ({ words, lastItem, selected, handleClick }) => {
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
