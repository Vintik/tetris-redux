import React from 'react';
import classes from './SplashScreen.scss';

const SPACE_BAR_KEYCODE = 32;

class SplashScreen extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown, false);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown, false);
  }

  onKeyDown = (event) => {
    if (event.keyCode === SPACE_BAR_KEYCODE) {
      console.log('calling #startGame');
      this.props.startGame();
    }
  }

  render() {
    return (
      <div>Press space to start game</div>
    );
  }
};

export default SplashScreen;
