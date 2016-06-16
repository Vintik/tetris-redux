import React from  'react';
import { map } from 'lodash';
import { GameStates } from '../../constants';
import SplashScreen from '../SplashScreen';

const CELL_SIZE = 20;

const Cell = (props) => {
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


const Row = (props) => {
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

const SPACE_BAR_KEYCODE = 32;
const UP_ARROW_KEYCODE = 38;
const DOWN_ARROW_KEYCODE = 40;
const LEFT_ARROW_KEYCODE = 37;
const RIGHT_ARROW_KEYCODE = 39;
const P_KEYCODE = 80;

class Tetris extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown, false);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown, false);
  }

  onKeyDown = (event) => {
    if (this.props.gameState === GameStates.SPLASH) {
      if (event.keyCode === SPACE_BAR_KEYCODE) {
        this.props.startGame();
      }
    } else if (this.props.gameState === GameStates.GAME_RUNNING) {
      switch (event.keyCode) {
        case DOWN_ARROW_KEYCODE: {
          this.props.moveTetriminoDown();
          break;
        }

        case UP_ARROW_KEYCODE: {
          this.props.rotateTetrimino();
          break;
        }

        case RIGHT_ARROW_KEYCODE: {
          this.props.moveTetriminoRight();
          break;
        }

        case LEFT_ARROW_KEYCODE: {
          this.props.moveTetriminoLeft();
          break;
        }

        case P_KEYCODE: {
          this.props.pauseGame();
          break;
        }
      }
    } else if (this.props.gameState === GameStates.GAME_PAUSED) {
      if (event.keyCode === P_KEYCODE) {
        this.props.unpauseGame();
      }
    } else if (this.props.gameState === GameStates.GAME_OVER) {
      if (event.keyCode === SPACE_BAR_KEYCODE) {
        this.props.startGame();
      }
    }
  }

  render() {
    if (this.props.gameState === GameStates.SPLASH)  {
      return (
        <div>Press space to start</div>
      );
    //     return (
    //       <SplashScreen startGame={this.props.startGame} />
    //     );
    }

    const style = {
      backgroundColor: 'black',
      border: '1px solid red',
      width: this.props.board.width * CELL_SIZE,
      height: this.props.board.height * CELL_SIZE,
      boxSizing: 'content-box',
      display: 'inline-block'
    };

    const t = this.props.tetrimino;

    return (
      <div style={style}>
        {
          map(this.props.board.rows, (row, y) => {
            return (
              <Row key={'y' + y}>
                {
                  map(row, (color, x) => {
                    // Check whether cell is part of current tetrimino
                    if (!color) {
                      const isTetriminoCell = y >= t.top && y < t.top + t.height && x >= t.left && x < t.left + t.width;

                      if (isTetriminoCell && t.shape[y - t.top][x - t.left]) {
                        color = t.color;

                      }
                    }

                    return (
                      <Cell key={'x' + x} color={color}/>
                    );
                  })
                }
              </Row>
            );
          })
        }
      </div>
    );
  }
}

export default Tetris;
