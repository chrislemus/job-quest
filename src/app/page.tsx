'use client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useBoolean } from '@common/hooks';
import { LoginModal } from '@app/home/_ui/login-modal';
import { Container, Grid, Box, Typography, Button } from '@common/ui/atoms';
import { SignUpModal } from './home/_ui';

export default function Home() {
  const [logIn, setLogin] = useBoolean();
  const [signUp, setSignUp] = useBoolean();

  const logInRedirect = useSearchParams().get('login');

  useEffect(() => {
    if (logInRedirect) {
      setLogin.on();
    }
  }, [logInRedirect]);

  return (
    <main style={{ background: 'hsl(0, 0%, 98%)' }}>
      <Container maxWidth="md">
        <LoginModal active={logIn} toggleActive={setLogin.toggle} />
        <SignUpModal active={signUp} toggleActive={setSignUp.toggle} />
        <Grid container pt={9} pb={9} rowSpacing={{ xs: 5 }}>
          <Grid xs={12} alignSelf="center" textAlign="center">
            <Typography variant="h3" component="h1" fontWeight="bold">
              Job Search Productivity
            </Typography>
            <Typography variant="body1" component="h1" pb={5} pt={1}>
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecata
              fugiat aliqua.
            </Typography>
            <Button
              color="primary"
              variant="contained"
              onClick={setSignUp.toggle}
            >
              Get Started
            </Button>
            <Button onClick={setLogin.toggle}>Log In</Button>
          </Grid>
          <Grid xs={12}>
            <Box>
              <img
                width="100%"
                src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
                alt="woman-on-phone"
                style={{
                  display: 'block',
                  marginRight: 'auto',
                  marginLeft: 'auto',
                  borderRadius: '1rem',
                  maxWidth: '850px',
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
