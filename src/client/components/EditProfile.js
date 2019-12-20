import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import useForm from './CustomHooks';

const useStyles = makeStyles(theme => ({
  root: {
    background: 'white',
  },
  paper: {
    backgroundColor: '#191970',
    borderStyle: 'solid',
    borderColor: 'white',
    borderWidth: 'thick',
  },
  type: {
    color: 'white',
  },
}));

const EditProfile = props => {
  const { open, setOpen, field, username, phoneNumber } = props;

  // const [title, setTitle] = useState('')
  // const [label, setLabel] = useState('')
  // const [currentText, setCurrentText] = useState('');
  // const [currentValue, setCurrentValue] = useState('')

  const [value, setValue] = useState();

  const classes = useStyles();

  const handleUsername = () => {
    setValue(value => event.target.value);
  };

  const handlePhoneNumber = () => {
    const { target } = event;
    const input = target.value.replace(/\D/g, '').substring(0, 10); // First ten digits of input only
    const zip = input.substring(0, 3);
    const middle = input.substring(3, 6);
    const last = input.substring(6, 10);

    if (input.length > 6) setValue(`(${zip}) ${middle} - ${last}`);
    else if (input.length > 3) setValue(`(${zip}) ${middle}`);
    else if (input.length >= 0) setValue(`(${zip}`);
  };

  const dispatch = useDispatch();
  const editUser = () => {
    event.preventDefault();
    const editProp = field === 'name' ? 'username' : 'phoneNumber';
    dispatch({
      type: 'USER_EDIT_REQUESTING',
      value,
      editProp,
    });
    setValue('');
  };

  let title = '';
  let label = '';
  let currentText = '';
  let currentValue = '';
  let handleChange = '';
  if (field === 'name') {
    title = 'Edit Username';
    label = 'New Username';
    currentText = 'Current Name: ';
    currentValue = username;
    handleChange = handleUsername;
  } else {
    title = 'Edit Phone Number';
    label = 'New Phone Number';
    currentText = 'Current Listing: ';
    currentValue = phoneNumber;
    handleChange = handlePhoneNumber;
  }

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      PaperProps={{ className: classes.paper }}
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="form-dialog-title"
    >
      <form onSubmit={editUser}>
        <DialogTitle id="form-dialog-title" className={classes.type}>
          <strong>{title}</strong>
        </DialogTitle>
        <DialogContent className={classes.text}>
          <DialogContentText className={classes.type}>
            <em>{currentText}</em> {currentValue}
          </DialogContentText>

          <TextField
            className={classes.root}
            id="outlined-multiline-static"
            label={label}
            value={value || ''}
            autoFocus
            variant="filled"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.type}
            onClick={() => setOpen(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            className={classes.type}
            type="submit"
            onClick={() => setOpen(false)}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditProfile;
