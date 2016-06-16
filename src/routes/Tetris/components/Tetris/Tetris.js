import React from  'react';
import { map } from 'lodash';
import { GameStates, KeyCodes, CELL_SIZE } from '../../constants';
import SplashScreen from '../SplashScreen';
import Cell from './TetrisCell';
import Row from './TetrisRow';

import classes from './Tetris.scss';

class Tetris extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown, false);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown, false);
  }

  onKeyDown = (event) => {
    if (this.props.gameState === GameStates.SPLASH) {
      if (event.keyCode === KeyCodes.SPACE_BAR_KEYCODE) {
        this.props.startGame();
      }
    } else if (this.props.gameState === GameStates.GAME_RUNNING) {
      switch (event.keyCode) {
        case KeyCodes.DOWN_ARROW_KEYCODE: {
          this.props.moveTetriminoDown();
          break;
        }

        case KeyCodes.UP_ARROW_KEYCODE: {
          this.props.rotateTetrimino();
          break;
        }

        case KeyCodes.RIGHT_ARROW_KEYCODE: {
          this.props.moveTetriminoRight();
          break;
        }

        case KeyCodes.LEFT_ARROW_KEYCODE: {
          this.props.moveTetriminoLeft();
          break;
        }

        case KeyCodes.P_KEYCODE: {
          this.props.pauseGame();
          break;
        }
      }
    } else if (this.props.gameState === GameStates.GAME_PAUSED) {
      if (event.keyCode === KeyCodes.P_KEYCODE) {
        this.props.unpauseGame();
      }
    } else if (this.props.gameState === GameStates.GAME_OVER) {
      if (event.keyCode === KeyCodes.SPACE_BAR_KEYCODE) {
        this.props.startGame();
      }
    }
  }

  renderGameBoard() {
    const t = this.props.tetrimino;

    return map(this.props.board.rows, (row, y) => {
      return (
        <Row key={'y' + y}>
          {
            map(row, (color, x) => {
              // Check whether cell is part of current tetrimino
              if (!color && t) {
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
    });
  }

  renderSplashOverlay() {
    if (this.props.gameState === GameStates.SPLASH) {
      return (
        <div className={classes.tetrisSplash}><label>Press space to start</label></div>
      );
    }
  }

  renderGameLostOverlay() {
    if (this.props.gameState === GameStates.GAME_OVER) {
      return (
        <div className={classes.tetrisGameOver}>
          <label>
            <div>Game lost!</div>
            <div>Press space to restart.</div>
          </label>
        </div>
      );
    }
  }

  render() {
    const style = {
      backgroundColor: 'black',
      border: '1px solid red',
      width: this.props.board.width * CELL_SIZE,
      height: this.props.board.height * CELL_SIZE,
      boxSizing: 'content-box',
      display: 'inline-block',
      position: 'relative'
    };


    return (
      <div style={style}>
        {this.renderSplashOverlay()}
        {this.renderGameLostOverlay()}
        {this.renderGameBoard()}
      </div>
    );
  }
}

export default Tetris;
