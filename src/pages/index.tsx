import type { NextPage } from 'next';
import { Button } from '@app/common/components/atoms/button';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const LoginModal: React.FC<{ active: boolean; toggleActive: () => void }> = (
  p
) => {
  return (
    <div className={`modal ${p.active ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Modal title</p>
          <button className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          <p>swsw</p>{' '}
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success">Log In</button>
          <button className="button" onClick={p.toggleActive}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  const [logIn, setLogIn] = useState<boolean>(false);
  const toggleLogin = () => setLogIn((a) => !a);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

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

            <Button>Get Started</Button>

            <button
              className="button is-light"
              onClick={toggleLogin}
              style={{ marginLeft: '1rem' }}
            >
              LogIn
            </button>
          </div>
          <div className="column ">
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
};

export default Home;
