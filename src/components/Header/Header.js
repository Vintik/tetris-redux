import React from 'react';
import { IndexLink, Link } from 'react-router';
import classes from './Header.scss';

export const Header = () => (
  <div>
    <h1>{"Home of Victor's Tetris"}</h1>
    <IndexLink to='/' activeClassName={classes.activeRoute}>
      Home
    </IndexLink>
    {' · '}
    <Link to='/tetris' activeClassName={classes.activeRoute}>
      Tetris
    </Link>
  </div>
);

export default Header;
