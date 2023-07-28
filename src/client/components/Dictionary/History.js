import React, { memo } from 'react';
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

const MemoizedHistory = memo(
  History,
  (oldProps, newProps) =>
    oldProps.words !== newProps.words &&
    oldProps.selected === newProps.selected,
);

export default MemoizedHistory;
