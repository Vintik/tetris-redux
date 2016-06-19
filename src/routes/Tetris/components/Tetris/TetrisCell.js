import React from 'react';
import { CELL_SIZE } from '../../constants';

const TetrisCell = (props) => {
  const style = {
    backgroundColor: props.color,
    display: 'inline-block', // Move to css
    float: 'left',
    width: CELL_SIZE,
    height: CELL_SIZE
  }

  return (
    <span style={style} />
  );
}

export default TetrisCell;
