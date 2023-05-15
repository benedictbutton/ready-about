import { useState, useEffect, useCallback } from 'react';

const useSelectList = list => {
  const [selected, setSelected] = useState([]);
  const [keyPressed, setKeyPressed] = useState(false);

  const handleClick = (event, name) => {
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
      let farthestIdx = selected.reduce(
        (acc, curr, initialValue = 0) => {
          const position = listIds.indexOf(curr);
          const difference =
            currentIdx > position
              ? currentIdx - position
              : position - currentIdx;
          Math.max(acc, difference);
        },
      );

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
  };

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

  return {
    selected,
    handleClick,
    handleSelectAllClick,
    handleResetSelected,
    handleKeyUp,
    handleKeyDown,
  };
};

export default useSelectList;
