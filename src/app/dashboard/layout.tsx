'use client';
import clsx from 'clsx';
import { RouterAuthGuard } from '@src/features/auth/ui';
import { PropsWithChildren, useState } from 'react';

export default function Layout(p: PropsWithChildren<{}>) {
  return (
    <RouterAuthGuard>
      <div className="has-background-white-bis">
        <NavBar />
        {p.children}
      </div>
    </RouterAuthGuard>
  );
}

function NavBar() {
  const [activeMenu, setActiveMenu] = useState(false);
  const toggleActiveMenu = () => setActiveMenu((s) => !s);

  return (
    <nav className="navbar is-transparent ">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            alt="Bulma: a modern CSS framework based on Flexbox"
            width="112"
            height="28"
          />
        </a>
        <div
          className={clsx('navbar-burger', { 'is-active': activeMenu })}
          onClick={toggleActiveMenu}
          data-target="navbarExampleTransparentExample"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div
        id="navbarExampleTransparentExample"
        className={clsx('navbar-menu', { 'is-active': activeMenu })}
      >
        <div className="navbar-start">
          <a className="navbar-item" href="https://bulma.io/">
            Home
          </a>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="field is-grouped">
              <p className="control">
                <a
                  className="bd-tw-button button"
                  data-social-network="Twitter"
                  data-social-action="tweet"
                  data-social-target="https://bulma.io"
                  target="_blank"
                  href="https://twitter.com/intent/tweet?text=Bulma: a modern CSS framework based on Flexbox&amp;hashtags=bulmaio&amp;url=https://bulma.io&amp;via=jgthms"
                >
                  <span className="icon">
                    <i className="fab fa-twitter"></i>
                  </span>
                  <span>Tweet</span>
                </a>
              </p>
              <p className="control">
                <a
                  className="button is-primary"
                  href="https://github.com/jgthms/bulma/releases/download/0.9.4/bulma-0.9.4.zip"
                >
                  <span className="icon">
                    <i className="fas fa-download"></i>
                  </span>
                  <span>Download</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
