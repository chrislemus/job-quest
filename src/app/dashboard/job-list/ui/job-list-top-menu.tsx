import { useBoolean } from '@common/hooks';
import { Grid, Button } from '@common/ui/atoms';
import { AddJobModal } from './add-job-modal';

export function JobListTopMenu() {
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
