import React from 'react';
// material-ui
import FlipToBackIcon from '@material-ui/icons/FlipToBack';
import FlipToFrontIcon from '@material-ui/icons/FlipToFront';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const Toggle = ({ menuSwitch, setMenuSwitch }) => {
  return (
    <Tooltip title="Menu list">
      <IconButton
        aria-label="menu list"
        onClick={() => setMenuSwitch(menuSwitch => !menuSwitch)}
      >
        {menuSwitch ? (
          <FlipToFrontIcon style={{ color: 'white' }} />
        ) : (
          <FlipToBackIcon style={{ color: 'white' }} />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default Toggle;
