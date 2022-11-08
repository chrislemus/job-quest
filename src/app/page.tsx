'use client';
import { Button } from '@src/ui/atoms/button';
import { useState } from 'react';
import { LoginModal } from './ui/login-modal';

export default function Home() {
  const [logIn, setLogIn] = useState<boolean>(false);
  const toggleLogin = () => setLogIn((a) => !a);

  return (
    <>
      <main>
        <LoginModal active={logIn} toggleActive={toggleLogin} />
        <section
          className="section has-background-white-bis columns is-vcentered is-multiline"
          style={{ paddingBottom: '7rem' }}
        >
          <div className="column m-5">
            <h1 className="title is-1 mb-0">Streamline your</h1>
            <h1 className="title is-1 has-text-primary">Job Search</h1>
            <p className="mb-4">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua.
            </p>

            <Button color="primary">Get Started</Button>
            <Button onClick={toggleLogin} customStyle={{ marginLeft: '1rem' }}>
              Log In
            </Button>
          </div>
          <div className="column">
            <img
              className="image"
              height="100%"
              src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
              alt="woman-on-phone"
              style={{ borderRadius: '.5rem' }}
            />
          </div>
        </section>
      </main>
    </>
  );
}
