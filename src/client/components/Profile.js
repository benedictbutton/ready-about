import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// material-ui
import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import EditProfile from './EditProfile';
import useForm from './CustomHooks';

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    width: '100%',
  },
  paper: {
    flex: 1,
    backgroundColor: props =>
      props.keepOpen ? '#191970' : 'transparent',
    // '&:hover': {
    //   backgroundColor: '#191970',
    // },
    padding: theme.spacing(3),
    position: 'absolute',
    zIndex: 2000,
    minWidth: 300,
  },
  // paperHover: {
  //   backgroundColor: props =>
  //     props.keepOpen ? '#191970' : 'transparent',
  // },
  grid: {
    flex: 1,
    // margin: theme.spacing(2),
  },
  bigAvatar: {
    width: 50,
    height: 50,
  },
  button: {
    borderColor: 'white',
    color: 'white',
    '&:hover': {
      backgroundColor: '#BFEFFF',
      color: '#191970',
    },
  },
  divider: {
    color: 'white',
    borderStyle: 'solid',
    borderWidth: 1,
    margin: theme.spacing(0, 3),
  },
  type: {
    color: 'white',
  },
  profileType: { fontSize: 20, color: 'white' },
  date: { margin: theme.spacing(3, 0, 0, 3) },
}));

const MyPaper = props => {
  const { keepOpen, ...other } = props;
  const classes = useStyles(props);
  return <Paper className={classes.paper} {...other} />;
};

const Profile = props => {
  const { handleLogOut } = props;

  const file = useRef(null);
  const [ignore, setIgnore] = useState(false);
  const [update, setUpdate] = useState(false);
  const [profile, setProfile] = useState(false);
  const [picture, setPicture] = useState();
  const [open, setOpen] = useState(false);
  const [field, setField] = useState('');

  const classes = useStyles();

  const { id, username, avatar, phoneNumber } = useSelector(
    state => state.user,
  );

  const dispatch = useDispatch();
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

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const dt = new Date();
  const month = months[dt.getMonth()];
  const day = dt.getDate();

  const date = `${month} ${day}`;

  let newNumber = '';
  if (phoneNumber !== 'unlisted') {
    for (let i = 0; i < phoneNumber.length; i++) {
      if (i === 3 || i === 6) newNumber += '-';

      newNumber += phoneNumber[i];
    }
  }

  const userImage =
    avatar !== ''
      ? `https://ready-about.s3.amazonaws.com/${avatar}`
      : null;

  const keepOpen = !!(profile || picture);

  const resetPicture = () => setPicture(null);

  const handlePicture = () => {
    setPicture(file.current.files[0]);
  };

  const handleUpload = () => {
    event.preventDefault();
    setIgnore(true);
  };

  return (
    <>
      <div className={classes.root}>
        <Grid container justify="flex-end">
          <Grid item xs={9}>
            <Typography
              variant="h1"
              className={classes.date}
              align="left"
            >
              {date}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <MyPaper
              keepOpen={!!(profile || picture)}
              elevation={profile ? 5 : 0}
              onMouseEnter={() => setProfile(true)}
              onMouseLeave={() => setProfile(false)}
            >
              <Grid
                container
                className={classes.grid}
                spacing={2}
                justify="center"
                alignItems="center"
              >
                <Grid item xs={5} align="right">
                  <Typography
                    variant="body1"
                    className={classes.profileType}
                  >
                    Profile
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  {userImage ? (
                    <Avatar
                      alt="profile picture"
                      src={userImage}
                      className={classes.bigAvatar}
                    />
                  ) : (
                    <Avatar className={classes.bigAvatar}>
                      {username[0].toUpperCase()}
                    </Avatar>
                  )}
                </Grid>
                <Collapse in={keepOpen}>
                  <Grid
                    container
                    className={classes.grid}
                    spacing={2}
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={12}>
                      <Divider
                        className={classes.divider}
                        align="center"
                      />
                    </Grid>
                    <Grid item xs={5}>
                      {picture ? (
                        <Typography
                          className={classes.type}
                          variant="body1"
                          noWrap
                        >
                          {picture.name}
                        </Typography>
                      ) : (
                        <Typography
                          className={classes.type}
                          variant="body1"
                        >
                          Avatar
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={5}>
                      <form
                        encType="multipart/form-data"
                        method="PUT"
                        onSubmit={handleUpload}
                      >
                        <input
                          id="picture"
                          type="file"
                          ref={file}
                          style={{ display: 'none' }}
                          onChange={handlePicture}
                        />
                        {!picture ? (
                          <Button
                            className={classes.button}
                            variant="outlined"
                          >
                            <label htmlFor="picture">Upload</label>
                          </Button>
                        ) : (
                          <Button
                            className={classes.button}
                            variant="outlined"
                            type="submit"
                          >
                            Upload
                          </Button>
                        )}
                      </form>
                    </Grid>
                    <Grid item xs={2}>
                      {picture ? (
                        <IconButton onClick={resetPicture}>
                          <ClearIcon className={classes.type} />
                        </IconButton>
                      ) : (
                        <IconButton>
                          <DeleteIcon className={classes.type} />
                        </IconButton>
                      )}
                    </Grid>
                    <Grid item xs={5}>
                      <Typography
                        className={classes.type}
                        variant="body1"
                      >
                        Username
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography
                        className={classes.type}
                        variant="body1"
                      >
                        {username}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton
                        onClick={() => {
                          setOpen(true);
                          setProfile(false);
                          setField('name');
                        }}
                      >
                        <EditIcon className={classes.type} />
                      </IconButton>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography
                        className={classes.type}
                        variant="body1"
                      >
                        Phone Number
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography
                        className={classes.type}
                        variant="body1"
                      >
                        {newNumber || 'unlisted'}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton
                        onClick={() => {
                          setOpen(true);
                          setProfile(false);
                          setField('phone');
                        }}
                      >
                        <EditIcon className={classes.type} />
                      </IconButton>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography
                        className={classes.type}
                        variant="body1"
                        onClick={handleLogOut}
                      >
                        <a
                          href="#"
                          style={{
                            color: 'inherit',
                            textDecoration: 'none',
                          }}
                        >
                          Log Out
                        </a>
                      </Typography>
                    </Grid>
                  </Grid>
                </Collapse>
              </Grid>
            </MyPaper>
          </Grid>
        </Grid>
      </div>
      <EditProfile
        open={open}
        setOpen={setOpen}
        field={field}
        phoneNumber={newNumber}
        username={username}
      />
    </>
  );
};

export default Profile;

// {profile ? (
//   <>
//     <Grid item xs={12} align="left">
//       <Divider className={classes.divider} align="center" />
//     </Grid>
//     <Grid item xs={5}>
//       <Typography className={classes.type} variant="body1">
//         Avatar
//       </Typography>
//     </Grid>
//     <Grid item xs={5}>
//       <AddIcon className={classes.type} />
//     </Grid>
//   </>
// ) : null}

// <Popper
//   open={open}
//   anchorEl={anchorRef.current}
//   role={undefined}
//   transition
//   disablePortal
// >
//   {({ TransitionProps, placement }) => (
//     <Grow
//       {...TransitionProps}
//       style={{
//         transformOrigin: 'bottom',
//       }}
//     >
//       <ClickAwayListener onClickAway={handleClose}>
//         <MenuList
//           autoFocusItem={open}
//           id="menu-list-grow"
//           onKeyDown={handleListKeyDown}
//         >
//           <MenuItem onClick={handleClose}>
//             <Typography
//               className={classes.type}
//               variant="body1"
//             >
//               Avatar
//             </Typography>
//             <AddIcon className={classes.type} />
//           </MenuItem>
//           <MenuItem onClick={handleClose}>Log Out</MenuItem>
//         </MenuList>
//       </ClickAwayListener>
//     </Grow>
//   )}
// </Popper>

// const handleToggle = () => {
//   setOpen(prevOpen => !prevOpen);
// };

// const handleClose = event => {
//   if (
//     anchorRef.current &&
//     anchorRef.current.contains(event.target)
//   ) {
//     return;
//   }
//   setOpen(false);
// };
//
// function handleListKeyDown(event) {
//   if (event.key === 'Tab') {
//     event.preventDefault();
//     setOpen(false);
//   }
// }

// const prevOpen = React.useRef(open);
// useEffect(() => {
//   if (prevOpen.current === true && open === false) {
//     anchorRef.current.focus();
//   }
//
//   prevOpen.current = open;
// }, [open]);
