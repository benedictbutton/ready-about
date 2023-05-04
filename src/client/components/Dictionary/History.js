import React from 'react';
import MyList from '../MyList';

const History = ({ words, lastItem, selected, handleClick }) => {
  return (
    <MyList
      listItems={words}
      lastItem={lastItem}
      selected={selected}
      handleClick={handleClick}
    />
  );
};

export default History;
