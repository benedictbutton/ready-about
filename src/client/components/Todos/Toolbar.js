import React, { useState, useCallback } from 'react';
// material-ui
import clsx from 'clsx';
import {
  lighten,
  makeStyles,
  styled,
} from '@material-ui/core/styles';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FlipToFrontIcon from '@material-ui/icons/FlipToFront';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Toggle from '../AppBar/Toggle';
import EditTodo from './EditTodo';
import EditProfile from '../Profile/EditProfile';
import Reminder from './Reminder';
// import withAppBar from '../AppBar/withAppBar';

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    backgroundColor: '#191970',
  },
  highlight: {
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderColor: '#191970',
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

const TodosToolbar = ({
  menuSwitch,
  setMenuSwitch,
  numSelected,
  numOfTodos,
  onSelectAllClick,
  deleteTodos,
  selected,
  handleResetSelected,
}) => {
  const alter =
    numSelected > 0 ? { color: '#191970' } : { color: 'white' };
  const classes = useStyles(alter);

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEditClose = useCallback(() => {
    setEditOpen(false), [setEditOpen];
  });

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <Checkbox
        className={classes.checkbox}
        indeterminate={numSelected > 0 && numSelected < numOfTodos}
        checked={numSelected === numOfTodos}
        onChange={onSelectAllClick}
        inputProps={{ 'aria-label': 'select all todos' }}
      />
      <EditTodo
        selected={selected}
        handleResetSelected={handleResetSelected}
        editOpen={editOpen}
        handleEditClose={handleEditClose}
      />
      {numSelected > 0 && !open ? (
        <Typography className={classes.title} variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : open ? (
        <Typography className={classes.title} variant="subtitle1">
          <Reminder
            open={open}
            handleClose={handleClose}
            selected={selected}
            handleResetSelected={handleResetSelected}
          />
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h4"
          id="tableTitle"
        >
          TODOS
        </Typography>
      )}
      {numSelected === 1 && (
        <>
          <Tooltip title="Reminder">
            <IconButton aria-label="reminder" onClick={handleOpen}>
              <AccessAlarmIcon className={classes.checkbox} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton
              aria-label="reminder"
              onClick={() => setEditOpen(true)}
            >
              <EditIcon className={classes.checkbox} />
            </IconButton>
          </Tooltip>
        </>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={deleteTodos}>
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

export default TodosToolbar;
