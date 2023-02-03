import { useBoolean } from '@common/hooks';
import { Grid, Skeleton, Button } from '@common/ui/atoms';
import { AddJobModal } from './add-job-modal';

type JobListTopMenuProps = {
  loading?: boolean;
};

export function JobListTopMenu(p: JobListTopMenuProps) {
  const [activeModal, setActiveModal] = useBoolean();

  return (
    <Grid container justifyContent="flex-end">
      <Grid>
        <Button
          aria-label="add"
          size="small"
          variant="contained"
          onClick={setActiveModal.toggle}
        >
          Add
        </Button>
        <AddJobModal
          active={activeModal}
          toggleActive={setActiveModal.toggle}
        />
      </Grid>
    </Grid>
  );
}
