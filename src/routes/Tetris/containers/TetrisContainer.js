import { connect } from 'react-redux';
import { initSplash, startGame, moveTetriminoDown } from '../actions';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import Tetris from '../components/Tetris';

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapActionCreators = {
  initSplash,
  startGame,
  moveTetriminoDown
};

const mapStateToProps = (state) => ({
    board: state.tetris.board,
    tetrimino: state.tetris.tetrimino,
    gameState: state.tetris.gameState
});

export default connect(mapStateToProps, mapActionCreators)(Tetris);
