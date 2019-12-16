import React from "react";
import { Redirect, Link, withRouter } from "react-router-dom";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import useForm from "./CustomHooks";
// material-ui
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(1) * 2 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3, 3, 3)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  button: {
    marginTop: theme.spacing(2)
  },
  form: {
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    marginTop: theme.spacing(3)
  }
}));

const SignIn = props => {
  const classes = useStyles();

  const user = useSelector(state => state.user, shallowEqual);

  const dispatch = useDispatch();
  const signin = () => {
    dispatch({ type: "SIGNIN_REQUESTING", payload: values });
  };

  const { values, handleChange, handleSubmit } = useForm(signin);

  const handleRedirect = () => {
    props.history.push("/");
  };

  return (
    <div>
      {user.successful ? (
        <Redirect to="/in/todos" />
      ) : (
        <main className={classes.layout}>
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
                value={values.username || ""}
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                margin="normal"
                fullWidth
                onChange={handleChange}
                name="password"
                value={values.password || ""}
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
                onClick={handleRedirect}
              >
                Cancel
              </Button>
            </form>
          </Paper>
        </main>
      )}
    </div>
  );
};

export default withRouter(SignIn);
