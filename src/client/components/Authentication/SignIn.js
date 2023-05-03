import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
// material-ui
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import useForm from '../../CustomHooks/useForm';
import useOutsideClick from '../../CustomHooks/useOutsideClick';

const useStyles = makeStyles(theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(1) * 2 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3, 3, 3),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  button: {
    marginTop: theme.spacing(2),
  },
  error: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: '100%',
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing(1),
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 2000,
    background: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-70%)',
    width: '400px',
    height: '200px',
    background: 'white',
    color: 'black',
    boxShadow: '16px 17px 3px -6px rgba(0,0,0,0.1)',
    border: '1px solid black',
  },
  submit: {
    marginTop: theme.spacing(3),
  },
}));

const SignIn = props => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const user = useSelector(state => state.user, shallowEqual);

  const dispatch = useDispatch();
  const signin = () => {
    dispatch({ type: 'SIGNIN_REQUESTING', payload: values });
  };

  const {
    values,
    handleChange,
    handleSubmit,
    handleResetValues,
  } = useForm(signin);

  const handleClose = () => {
    handleResetValues();
    dispatch({ type: 'CLEAR_ERROR' });
    setOpen(false);
  };

  const ref = useOutsideClick(handleClose);

  const handleRedirect = event => {
    event.preventDefault();
    props.history.push('/');
  };

  useEffect(() => {
    if (user.successful) navigate('/in/todos');
  }, [user.successful]);

  return (
    <main className={classes.layout}>
      {/* {user.successful && <Redirect to="/in/todos" />} */}
      {user.error && (
        <div
          aria-labelledby="simple-dialog-title"
          open={open}
          onClose={handleClose}
          className={classes.modal}
        >
          <div
            id="simple-dialog-title"
            ref={ref}
            className={classes.modalContent}
          >
            <span className={classes.error}>{user.error}</span>
          </div>
        </div>
      )}
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            id="username"
            label="Username"
            type="text"
            margin="normal"
            fullWidth
            onChange={handleChange}
            name="username"
            value={values.username || ''}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            margin="normal"
            fullWidth
            onChange={handleChange}
            name="password"
            value={values.password || ''}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Button
            fullWidth
            className={classes.button}
            align="left"
            variant="contained"
            color="secondary"
            disabled={false}
            onClick={event => handleRedirect(event)}
          >
            Cancel
          </Button>
        </form>
      </Paper>
    </main>
  );
};

export default SignIn;
