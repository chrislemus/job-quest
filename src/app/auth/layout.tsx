'use client';
import { PropsWithChildren } from 'react';
import { theme } from '@common/theme';
import { Box, Container, Grid, Stack } from '@common/ui/atoms';
import { AuthFormGraphic, FormBottomText } from './_ui';
import { RouterAuthGuard } from '@app/auth/_ui';

export default function AuthLayout(p: PropsWithChildren<{}>) {
  return (
    <Box
      style={{
        backgroundColor: '#FAFDFF',
        height: 'calc(100vh + 20rem)',
        paddingTop: '4rem',
      }}
    >
      <RouterAuthGuard>
        <Container>
          <Grid container boxShadow={4} borderRadius={4} overflow="hidden">
            <Grid boxShadow="inherit" xs={12} sm={6}>
              <AuthFormGraphic />
            </Grid>
            <Grid
              sx={{ background: '#fff' }}
              boxShadow="inherit"
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
                  sx={{
                    paddingY: 5,
                    [theme.breakpoints.down('sm')]: {
                      paddingY: 10,
                    },
                  }}
                >
                  <Stack spacing={3}>
                    {p.children}
                    <Box>
                      <FormBottomText />
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </RouterAuthGuard>
    </Box>
  );
}
