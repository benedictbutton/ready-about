import { useState } from 'react';
import { useSelector } from 'react-redux';

const useForm = callback => {
  const [values, setValues] = useState({});
  const [selected, setSelected] = useState([]);
  const [keyPressed, setKeyPressed] = useState(false);

  const { todos } = useSelector(state => state.todos);

  const handleChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

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
      const todosIds = todos.map(el => el._id);
      const currentIdx = todosIds.indexOf(name);
      let farthestIdx = selected.reduce(
        (acc, curr, initialValue = 0) => {
          const position = todosIds.indexOf(curr);
          const difference =
            currentIdx > position
              ? currentIdx - position
              : position - currentIdx;
          Math.max(acc, difference);
        },
      );

      farthestIdx = todosIds.indexOf(farthestIdx);
      newSelected = todosIds.filter((el, idx) => {
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

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = todos.map(el => el._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleSubmit = event => {
    event.preventDefault();
    callback();
  };

  const handleResetValues = () => setValues({});

  const handleResetSelected = () => setSelected([]);

  const handleKeyUp = event => {
    if (event.key === 'Shift' && keyPressed) console.log(keyPressed);
    setKeyPressed(false);
  };

  const handleKeyDown = event => {
    if (event.key === 'Shift' && !keyPressed) {
      setKeyPressed(true);
      console.log(keyPressed);
    }
  };

  return {
    values,
    selected,
    handleChange,
    handleClick,
    handleSelectAllClick,
    handleSubmit,
    handleResetValues,
    handleResetSelected,
    handleKeyUp,
    handleKeyDown,
  };
};

export default useForm;
