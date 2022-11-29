import { theme } from '@common/theme';
import { Box, Stack, Typography } from '@common/ui/atoms';
import { HistoryEduIcon } from '@common/ui/icons';

export function AuthFormGraphic() {
  return (
    <Box
      style={{
        padding: '4rem 2rem',
        background:
          'linear-gradient(133deg, rgba(0,98,255,1) 0%, rgba(5,123,237,1) 35%, rgba(0,212,255,1) 100%)',
      }}
    >
      <Stack spacing={1}>
        <Box sx={{ display: 'flex' }}>
          <HistoryEduIcon
            sx={{
              fontSize: theme.typography.h4,
              color: '#fff',
            }}
          />
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: theme.typography.fontWeightBold,
              color: '#ffff',
              marginLeft: 2,
            }}
          >
            Job Quest
          </Typography>
        </Box>
        <Typography
          variant="subtitle1"
          sx={{
            color: '#ffff',
          }}
        >
          Find for your dream job in seconds.
        </Typography>
      </Stack>
      <Box
        sx={{
          width: 50,
          height: 3,
          margin: '1rem 0',
          backgroundColor: 'white',
        }}
      />
      <Box
        sx={{
          marginTop: 5,
          borderRadius: 3,
          boxShadow: 3,
          width: '80%',
        }}
      >
        <img
          width="100%"
          src="/job-quest-dashboard.png"
          alt="job-quest-dashboard"
          style={{
            display: 'block',
            borderRadius: '.2rem',
          }}
        />
      </Box>
    </Box>
  );
}
