import React from 'react';
import MyList from '../MyList';

const History = ({ words, lastItem, selected, handleClick }) => {
  return (
    <MyList
      listItems={words}
      lastItem={el => (lastItem.current = el)}
      selected={selected}
      handleClick={handleClick}
    />
  );
};

export default History;
