'use client';
import { PropsWithChildren } from 'react';
import { theme } from '@common/theme';
import { Box, Container, Grid, Typography } from '@common/ui/atoms';
import { AuthFormGraphic } from './ui';
import { Stack } from '@mui/system';
import { HistoryEduIcon } from '@common/ui/icons';
import Link from 'next/link';

export default function AuthLayout(p: PropsWithChildren<{}>) {
  return (
    <div
      style={{
        backgroundColor: '#FAFDFF',
        height: 'calc(100vh + 20rem)',
      }}
    >
      <Container style={{ paddingTop: '4rem' }}>
        <Grid container>
          <Grid
            sx={{
              boxShadow: 4,
            }}
            xs={12}
            sm={6}
          >
            <AuthFormGraphic />
          </Grid>

          <Grid
            sx={{
              background: '#fff',
              boxShadow: 4,
              // paddingY: 6,
              // paddingX: 3
            }}
            xs={12}
            sm={6}
          >
            <Grid
              container
              justifyContent="center"
              alignContent="center"
              display="flex"
              height="100%"
            >
              <Grid
                xs={10}
                sm={8}
                // paddingY={6}
                sx={{
                  [theme.breakpoints.up('sm')]: {
                    marginTop: -5,
                  },
                  [theme.breakpoints.down('sm')]: {
                    paddingY: 10,
                  },
                }}
              >
                <Stack spacing={3}>
                  {p.children}
                  <Box>
                    <Typography variant="subtitle2">
                      Don't have an account?{' '}
                      <Typography
                        variant="inherit"
                        display="inline"
                        component="a"
                        href="/auth/signup"
                        sx={{ textDecoration: 'none', color: 'inherit' }}
                        fontWeight={theme.typography.fontWeightBold}
                      >
                        Sign up
                      </Typography>
                      .
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
