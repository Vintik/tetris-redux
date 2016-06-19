import React from 'react';
import classes from './TetrisControls.scss';

const TetrisControls = (props) => {
  return (
    <div className={classes.tetrisControls}>
      <div>Left arrow - Move Left</div>
      <div>Right arrow - Move Right</div>
      <div>Down arrow - Soft Drop</div>
      <div>Up arrow - Rotate</div>
      <div>P - Pause/Unpause Game</div>
    </div>
  );
};

export default TetrisControls;
