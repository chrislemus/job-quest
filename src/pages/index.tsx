import type { NextPage } from 'next';
import { NavBar1 } from '@app/common/components/organisms/navbars/navbar-1';
import { Button } from '@app/common/components/atoms/button';

const Home: NextPage = () => {
  return (
    <>
      <NavBar1 />
      <main>
        <section
          className="section has-background-white-bis columns"
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
        <section className="section has-background-link-light columns is-centered pb-6">
          <div
            className="box columns column is-8 is-multiline is-centered "
            style={{ marginTop: '-5rem' }}
          >
            <div className="column is-10 title">
              <h1>Get Started in Seconds</h1>
            </div>
            <div className="column is-10">
              <input className="input" type="text" placeholder="email" />
            </div>
            <div className="column is-10">
              <input className="input" type="text" placeholder="password" />
            </div>
            <div className="column is-10">
              <span>
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              </span>
            </div>
            <div className="column is-10">
              <Button>Sign Up</Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
