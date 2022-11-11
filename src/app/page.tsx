'use client';
import { Button } from '@common/ui/atoms/button';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useBoolean } from '@common/hooks';
import { LoginModal } from '@app/home/ui/login-modal';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';

export default function Home() {
  const [logIn, setLogin] = useBoolean();

  const logInRedirect = useSearchParams().get('login');

  useEffect(() => {
    if (logInRedirect) setLogin.on();
  }, [logInRedirect]);

  return (
    <Container
      maxWidth="lg"
      style={{
        background: 'hsl(0, 0%, 98%)',
        paddingTop: '5rem',
        paddingBottom: '5rem',
      }}
    >
      <main>
        <LoginModal active={logIn} toggleActive={setLogin.toggle} />
        {/* <section
        // className="section has-background-white-bis columns is-vcentered is-multiline"
        // style={{ paddingBottom: '7rem' }}
        > */}
        {/* <Box sx={{ flexGrow: 1 }}> */}
        <Grid container spacing={2}>
          <Grid xs={6}>
            {/* <div className="column m-5"> */}
            <h1 className="title is-1 mb-0">Streamline your</h1>
            <h1 className="title is-1 has-text-primary">Job Search</h1>
            <p className="mb-4">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecata
              fugiat aliqua.
            </p>

            <Button color="primary" variant="contained">
              Get Started
            </Button>
            <Button
              onClick={setLogin.toggle}
              customStyle={{ marginLeft: '1rem' }}
            >
              Log In
            </Button>
            {/* </div> */}
          </Grid>
          <Grid xs={6}>
            {/* <div className="column"> */}
            <img
              className="image"
              // height="100%"
              src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
              alt="woman-on-phone"
              style={{
                display: 'block',
                height: 'auto',
                width: ' 100%',
                borderRadius: '1rem',
              }}
            />
            {/* </div>{' '} */}
          </Grid>
        </Grid>
        {/* </Box> */}
        {/* </section> */}
      </main>
    </Container>
  );
}
