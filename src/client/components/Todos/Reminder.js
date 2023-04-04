import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// material-ui
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
} from '@material-ui/pickers';

const Reminder = props => {
  const { open, handleClose, selected, handleResetSelected } = props;
  const [selectedDate, handleDateChange] = useState(new Date());
  const { id, username, phoneNumber } = useSelector(
    state => state.user,
  );

  const dispatch = useDispatch();
  const handleSubmit = selectedDate => {
    event.preventDefault();
    dispatch({
      type: 'TODO_REMINDER_POST_REQUESTING',
      values: { id, username, phoneNumber, selected, selectedDate },
    }),
      [dispatch];
    handleResetSelected();
  };

  return null;
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <form onSubmit={handleSubmit}>
      <DateTimePicker
        open={open}
        onClose={handleClose}
        onAccept={selectedDate => handleSubmit(selectedDate)}
        value={selectedDate}
        onChange={handleDateChange}
        format="MM/dd/yyyy HH:mm"
      />
    </form>
  </MuiPickersUtilsProvider>;
};

export default Reminder;
