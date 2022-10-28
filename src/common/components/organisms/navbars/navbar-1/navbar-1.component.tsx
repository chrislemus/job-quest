import { Button } from '@app/common/components/atoms/button';
import { useState } from 'react';
import { useMenuActiveClass } from '../hooks';

export const NavBar1 = () => {
  const { onMenuClick, menuActiveClass } = useMenuActiveClass();

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
            height="28"
          />
        </a>

        <a
          role="button"
          className={`navbar-burger ${menuActiveClass}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={onMenuClick}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className={`navbar-menu ${menuActiveClass}`}>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Button element="a">
                {' '}
                <strong>Sign up</strong>
              </Button>

              <Button element="a" color="light">
                Log in
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
