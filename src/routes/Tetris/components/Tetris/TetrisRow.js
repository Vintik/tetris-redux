import React from 'react';
import { CELL_SIZE } from '../../constants';

const TetrisRow = (props) => {
  const style = {
    display: 'inline-block',
    height: CELL_SIZE,
    float: 'left',
    width: props.children.length * CELL_SIZE
  };

  return (
    <div style={style}>
      {props.children}
    </div>
  );

};

export default TetrisRow;
