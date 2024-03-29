import React from 'react';
import { CSSTransition } from 'react-transition-group';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  typeTopOne: {
    fontFamily: props =>
      props.activeLink
        ? "'Parisienne', cursive"
        : "'Helvetica Neue', sans-serif",
    margin: theme.spacing(2),
    color: '#191970',
  },
  typeTopTwo: {
    fontFamily: props =>
      props.activeLink
        ? "'Parisienne', cursive"
        : "'Helvetica Neue', sans-serif",
    margin: theme.spacing(2),
    color: '#191970',
    zIndex: -1000,
  },
  test: {
    zIndex: -1000,
  },
  typeBottom: {
    fontFamily: props =>
      props.activeLink
        ? "'Parisienne', cursive"
        : "'Helvetica Neue', sans-serif",
    margin: theme.spacing(2),
    color: '#191970',
  },
}));

const SubMenu = props => {
  const classes = useStyles(props);
  const { activeLink, bottomMenuOption, setOpenHistory } = props;

  return (
    <CSSTransition classNames="link" in={!activeLink} timeout={500}>
      <Typography
        variant="h4"
        className={classes.typeBottom}
        // onClick={() => setActiveLink(!activeLink)}
        onClick={() => setOpenHistory(true)}
      >
        {bottomMenuOption}
      </Typography>
    </CSSTransition>
  );
};

export default SubMenu;
