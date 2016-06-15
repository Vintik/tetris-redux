import { ActionTypes } from '../constants';

export function initSplash() {
  return {
    type: ActionTypes.InitSplash
  }
};

export function startGame() {
  return (dispatch, getState) => {
    const timerId = setInterval(() => {
      dispatch(moveTetriminoDown());
    }, 1000);

    dispatch({ type: ActionTypes.START_GAME, payload: { timerId } });
  };
};

export function moveTetriminoDown() {
  return {
    type: ActionTypes.MOVE_TETRIMINO_DOWN
  };
};

export function moveTetriminoLeft() {
  return {
    type: ActionTypes.MOVE_TETRIMINO_LEFT
  };
};

export function moveTetriminoRight() {
  return {
    type: ActionTypes.MOVE_TETRIMINO_RIGHT
  };
};

export function rotateTetrimino() {
  return {
    type: ActionTypes.ROTATE_TETRIMINO
  };
};

export default {
  initSplash,
  startGame,
  moveTetriminoDown,
  moveTetriminoLeft,
  moveTetriminoRight,
  rotateTetrimino
};
