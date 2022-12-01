import { useBoolean } from '@common/hooks';
import { Grid, Skeleton, Button } from '@common/ui/atoms';
import { AddJobModal } from './add-job-modal';

interface JobListSubNavProps {
  loading?: boolean;
}

export function JobListSubNav(p: JobListSubNavProps) {
  const [activeModal, setActiveModal] = useBoolean();

  return (
    <>
      {p.loading ? (
        <Skeleton variant="rectangular" height={60} />
      ) : (
        <Grid container justifyContent="flex-end" paddingTop={2}>
          <AddJobModal
            active={activeModal}
            toggleActive={setActiveModal.toggle}
          />
          <Grid>
            <Button
              aria-label="add"
              variant="contained"
              onClick={setActiveModal.toggle}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
}
