import React from 'react';
// material-ui
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    borderColor: 'white',
    color: 'white',
    '&:hover': {
      backgroundColor: '#BFEFFF',
      color: '#191970',
    },
  },
  type: {
    color: 'white',
  },
}));

const AvatarField = ({
  picture,
  handleUpload,
  file,
  handlePicture,
  resetPicture,
}) => {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={5}>
        {picture ? (
          <Typography className={classes.type} variant="body1" noWrap>
            {picture.name}
          </Typography>
        ) : (
          <Typography className={classes.type} variant="body1">
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
            <Button className={classes.button} variant="outlined">
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
    </>
  );
};

export default AvatarField;
