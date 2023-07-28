import { useState, useEffect, useCallback } from 'react';

const useSelectList = (list, callback) => {
  const [selected, setSelected] = useState([]);
  const [keyPressed, setKeyPressed] = useState(false);

  const handleClick = useCallback(
    (event, name) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
      setSelected(newSelected);

      if (keyPressed === true && selected.length > 0) {
        const listIds = list.map(el => el._id);
        const currentIdx = listIds.indexOf(name);
        let farthestIdx = selected.reduce((acc, curr) => {
          const position = listIds.indexOf(curr);
          const difference =
            currentIdx > position
              ? currentIdx - position
              : position - currentIdx;
          return Math.max(acc, difference);
        }, 0);

        farthestIdx = listIds.indexOf(farthestIdx);
        newSelected = listIds.filter((el, idx) => {
          if (
            (currentIdx < farthestIdx &&
              idx >= currentIdx &&
              idx <= farthestIdx) ||
            (currentIdx > farthestIdx &&
              idx <= currentIdx &&
              idx >= farthestIdx)
          ) {
            return el;
          }
        });
        setSelected(newSelected);
      }
    },
    [keyPressed, list, selected],
  );

  const handleSelectAllClick = (list, event) => {
    if (event.target.checked) {
      const newSelecteds = list.map(el => el._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleResetSelected = () => setSelected([]);

  const handleKeyUp = useCallback(
    event => {
      if (event.key === 'Shift' && keyPressed) setKeyPressed(false);
    },
    [keyPressed],
  );

  const handleKeyDown = useCallback(
    event => {
      if (event.key === 'Shift' && !keyPressed) setKeyPressed(true);
    },
    [keyPressed],
  );

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [handleKeyUp]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleSelectSubmit = () => {
    const word = list.filter(
      listItem => listItem._id === selected[0],
    )[0].item;
    callback({ word });
    handleResetSelected();
  };
  console.log('test: ', selected);

  return {
    selected,
    handleClick,
    handleSelectAllClick,
    handleResetSelected,
    handleSelectSubmit,
  };
};

export default useSelectList;
