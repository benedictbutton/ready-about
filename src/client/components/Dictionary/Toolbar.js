import React, { useState, useCallback } from 'react';
import clsx from 'clsx';
import Toggle from '../AppBar/Toggle';
// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    backgroundColor: '#3B5768',
  },
  highlight: {
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderColor: '#3B5768',
    borderWidth: 'thick',
  },
  title: {
    flex: '1 1 100%',
    color: props => props.color,
  },
  checkbox: {
    color: props => props.color,
  },
}));

const DictionaryToolbar = ({
  menuSwitch,
  setMenuSwitch,
  numSelected,
  numOfWords,
  words,
  onSelectAllClick,
  deleteWord,
  selected,
  handleResetSelected,
}) => {
  const alter =
    numSelected > 0 ? { color: '#3B5768' } : { color: 'white' };

  const classes = useStyles(alter);
  const [open, setOpen] = useState(false);

  console.log(numSelected + ', ' + numOfWords);

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <Checkbox
        className={classes.checkbox}
        indeterminate={numSelected > 0 && numSelected < numOfWords}
        checked={numSelected === numOfWords}
        onChange={e => onSelectAllClick(words, e)}
        inputProps={{ 'aria-label': 'select all todos' }}
      />
      {numSelected > 0 && (
        <Typography className={classes.title} variant="subtitle1">
          {numSelected} selected
        </Typography>
      )}
      {!numSelected && (
        <Typography
          className={classes.title}
          align="center"
          variant="h4"
          id="tableTitle"
        >
          DICTIONARY
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            aria-label="delete"
            onClick={() =>
              deleteWord({
                variables: { _id: selected[0] },
              })
            }
          >
            <DeleteIcon color="secondary" />
          </IconButton>
        </Tooltip>
      ) : (
        <Toggle
          menuSwitch={menuSwitch}
          setMenuSwitch={setMenuSwitch}
        />
      )}
    </Toolbar>
  );
};

export default DictionaryToolbar;
