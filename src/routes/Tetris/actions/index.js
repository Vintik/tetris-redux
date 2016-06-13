import { ActionTypes } from '../constants';

export function initSplash() {
  return {
    type: ActionTypes.InitSplash,
    payload: null
  }
};

export function startGame() {
  console.log('actions #startGame');
  return {
    type: ActionTypes.START_GAME,
    payload: null
  };
};
