'use client';
import { PropsWithChildren } from 'react';
import { theme } from '@common/theme';
import { Box, Container, Grid } from '@common/ui/atoms';
import { AuthFormGraphic, FormBottomText } from './ui';
import { Stack } from '@mui/system';
import { RouterAuthGuard } from '@core/auth/ui';

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
          <Grid container>
            <Grid boxShadow={4} xs={12} sm={6}>
              <AuthFormGraphic />
            </Grid>
            <Grid sx={{ background: '#fff' }} boxShadow={4} xs={12} sm={6}>
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
