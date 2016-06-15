export const ActionTypes = {
  INIT_SPLASH: 'INIT_SPLASH',
  START_GAME: 'START_GAME',
  MOVE_TETRIMINO_DOWN: 'MOVE_TETRIMINO_DOWN'
};

export const GameStates = {
  SPLASH: 'SPLASH',
  GAME_STARTED: 'GAME_STARTED'
};

// NOTE: colors taken from Vadim Gerasimov's Tetris 3.12
// https://en.wikipedia.org/wiki/Tetris#Colors_of_Tetriminos
export const TetriminoColors = {
  MAROON: '#AA0000',
  LIGHT_GRAY: '#C0C0C0' ,
  PURPLE: '#AA00AA',
  NAVY_BLUE: '#0000AA',
  DARK_GREEN: '#00AA00',
  BROWN: '#AA5500',
  TEAL: '#00AAAA'
}

export const TetriminoShapes = {
  STRAIGHT: [[1, 1, 1, 1]],
  SQUARE: [[1, 1], [1, 1]],
  T_TURN: [[0, 1, 0], [1, 1, 1]],
  L_SNAKE: [[1, 1, 0], [0, 1, 1]],
  R_SNAKE: [[0, 1, 1], [1, 1, 0]],
  L_GUN: [[0, 0, 1], [1, 1, 1]],
  R_GUN: [[1, 0, 0], [1, 1, 1]]
}
