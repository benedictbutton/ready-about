import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Grid, Typography } from '@material-ui/core';

const History = ({ user }) => {
  const words = user?.wordsHistory?.map(word => (
    <Typography variant="body1" align="left" key={uuidv4()}>
      {word?.text}
    </Typography>
  ));

  return (
    <Grid item xs={12}>
      {words || <h1>Loading...</h1>}
    </Grid>
  );
};
//   <>
//     {words !== undefined && (
//       <Grid item xs={12}>
//         {words.map(word => (
//           <Typography variant="body1" align="left">
//             {word}
//           </Typography>
//         ))}
//       </Grid>
//     )}
//   </>

export default History;

// className={classes.fl}
