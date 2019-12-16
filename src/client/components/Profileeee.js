import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// material-ui
import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import useForm from './CustomHooks';

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    backgroundColor: '#9fa8a3',
    margin: theme.spacing(4),
  },
  grid: {
    margin: theme.spacing(2),
  },
  bigAvatar: {
    width: 50,
    height: 50,
  },
}));

const Profile = props => {
  const classes = useStyles();
  const file = useRef(null);
  const [ignore, setIgnore] = useState(false);
  const [update, setUpdate] = useState(false);
  const [icon, setIcon] = useState(false);
  const [picture, setPicture] = useState();

  const { id, avatar, phoneNumber } = useSelector(
    state => state.user,
  );

  const updatePhoneNumber = () => setUpdate(true);

  const { values, handleChange, handleSubmit } = useForm(
    updatePhoneNumber,
  );

  const dispatch = useDispatch();

  const handleUpload = event => {
    setIgnore(true);
  };

  const resetPicture = () => setPicture(null);

  useEffect(() => {
    if (ignore === false) return;
    const fetchData = async () => {
      setIgnore(false);
      try {
        const formData = new FormData();
        const image = file.current.files[0];
        formData.append('avatar', image);
        const response = await fetch(`/api/user/imageUpload`, {
          credentials: 'include',
          method: 'PUT',
          headers: { Authorization: `Bearer ${sessionStorage.jwt}` },
          body: formData,
        });
        const responseJson = await response.json();
        // if (!response.ok) throw responseJson;
        dispatch({
          type: 'USER_ADD_AVATAR',
          image: responseJson.avatar,
        });
        resetPicture();
        return;
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [file, ignore, avatar]);

  useEffect(() => {
    if (!update) return;
    debugger;
    const postUpdate = async () => {
      setUpdate(false);
      try {
        const response = await fetch(`/api/user/phoneNumber`, {
          credentials: 'same-origin',
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.jwt}`,
          },
          body: JSON.stringify(values),
        });
        const responseJson = await response.json();
        dispatch({ type: 'USER_UPDATE_PHONENUMBER', responseJson });
      } catch (err) {
        console.log(err);
      }
    };
    postUpdate();
  }, [update]);

  const userImage =
    avatar !== ''
      ? `https://ready-about.s3.amazonaws.com/${avatar}`
      : null;

  return (
    <Paper className={classes.root}>
      <Grid
        container
        className={classes.grid}
        spacing={5}
        justify="center"
        alignItems="center"
      >
        <Grid item xs={4} align="right">
          <form encType="multipart/form-data" method="PUT">
            <input
              id="picture"
              type="file"
              ref={file}
              onChange={() => setPicture(file.current.files[0])}
            />
            <label htmlFor="picture">
              {icon ? (
                <Avatar
                  onMouseLeave={() => setIcon(false)}
                  className={classes.bigAvatar}
                >
                  <AddIcon />
                </Avatar>
              ) : userImage ? (
                <Avatar
                  alt="profile picture"
                  src={userImage}
                  className={classes.bigAvatar}
                  onMouseEnter={() => setIcon(true)}
                />
              ) : (
                <Avatar
                  className={classes.bigAvatar}
                  onMouseEnter={() => setIcon(true)}
                >
                  {username[0]}
                </Avatar>
              )}
            </label>
          </form>
        </Grid>
        <Grid item xs={7} align="left">
          {picture ? (
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
              >
                Upload
              </Button>{' '}
              <Typography variant="body1">{picture.name}</Typography>
            </div>
          ) : (
            <Typography variant="body1">Profile</Typography>
          )}
        </Grid>
      </Grid>
      <Grid container>
        <form onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            label="Phone Number"
            name="phoneNumber"
            defaultValue={phoneNumber || 'Unlisted'}
            variant="filled"
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" type="submit">
            Add/Update
          </Button>
        </form>
      </Grid>
    </Paper>
  );
};

export default Profile;
// onClick={() => setFileName(file.current)}
