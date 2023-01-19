import { useUserProfile } from '@app/user/_query-hooks';
import { Avatar, Box, Grid } from '@common/ui/atoms';

export function JobLog() {
  const user = useUserProfile();
  const firstNameInitial = user.data?.firstName?.[0] || '?';

  return (
    <Grid container paddingY={6}>
      <Grid container rowSpacing={1} columnSpacing={1}>
        <Grid>
          <Avatar sx={{ width: 24, height: 24 }}>{firstNameInitial}</Avatar>
        </Grid>
        <Grid flexGrow={1}>Cdwedwe</Grid>
      </Grid>
      <Box>dwe</Box>
    </Grid>
  );
}
