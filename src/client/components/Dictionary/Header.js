import React from 'react';
import Typography from '@material-ui/core/Typography';

const Header = ({ apiData }) => {
  let header =
    apiData && apiData[0] instanceof Object
      ? apiData[0].meta.id
      : 'Did you mean?';

  if (header[header.length - 2] === ':') header = header.slice(0, -2);

  return (
    <Typography
      variant={header[header.length - 1] === '?' ? 'h4' : 'h3'}
    >
      {header}
    </Typography>
  );
};

export default Header;
