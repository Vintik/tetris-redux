import React from  'react';
import { GameStates } from '../../constants';
import SplashScreen from '../SplashScreen'

class Tetris extends React.Component {
  render() {
    switch (this.props.gameState) {
      case GameStates.GAME_STARTED: {
        return (
          <div>Game Started</div>
        );
      }
      case GameStates.SPLASH: {
        console.log(this.props.startGame);
        return (
          <SplashScreen startGame={this.props.startGame} />
        );
      }
      default: {}
    }
  }
}

export default Tetris;
