import type { NextPage } from 'next';
import { NavBar1 } from '@app/common/components/organisms/navbars/navbar-1';
import { Button } from '@app/common/components/atoms/button';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const Home: NextPage = () => {
  const [logIn, setLogIn] = useState(false);
  const toggleLogin = () => setLogIn((a) => !a);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <>
      {/* <NavBar1 /> */}
      <main>
        <section
          className="section has-background-white-bis columns"
          style={{ paddingBottom: '7rem' }}
        >
          <div className={`modal ${logIn ? 'is-active' : ''}`}>
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
                <button className="button" onClick={toggleLogin}>
                  Cancel
                </button>
              </footer>
            </div>
          </div>

          <div className="column m-5">
            <h1 className="title is-1 mb-0">Streamline your</h1>
            <h1 className="title is-1 has-text-primary">Job Search</h1>
            <p className="mb-4">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua.
            </p>
            {/* <Button>Get Started</Button> */}
          </div>
          <div className="column p-0">
            <img
              className="image"
              height="100%"
              src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
              alt="woman-on-phone"
            />
          </div>
        </section>
        <section className="section has-background-light columns is-centered pb-6">
          <form
            className="box columns column is-8 is-multiline is-centered "
            onSubmit={handleSubmit(onSubmit)}
            style={{ marginTop: '-5rem' }}
          >
            <div className="column is-10 title">
              <h1>Get Started in Seconds</h1>
            </div>
            <div className="column is-10">
              <input
                className="input"
                type="text"
                placeholder="email"
                {...register('email', { required: true })}
              />
            </div>
            <div className="column is-10">
              <input
                className="input"
                type="text"
                placeholder="password"
                {...register('password', { required: true })}
              />
            </div>
            <div className="column is-10">
              <span>
                Anim aute id magna aliqua ad ad non deserunt sunt. <a>linkto</a>
                Qui irure qui
              </span>
            </div>
            <div className="column is-10">
              <button type="submit" className="button is-primary">
                Sign Up
              </button>
              <p className="mt-5 is-clickable">
                Already have an account?{' '}
                <span onClick={toggleLogin}>Login</span> Instead.
              </p>

              {/* <div></div> */}
              {/* <Button>Sign Up</Button> */}
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default Home;
