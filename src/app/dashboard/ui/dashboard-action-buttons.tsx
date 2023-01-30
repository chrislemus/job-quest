import { useBoolean } from '@common/hooks';
import { Grid, Skeleton, Button } from '@common/ui/atoms';
import { AddJobModal } from './add-job-modal';

type DashboardActionButtonsProps = {
  loading?: boolean;
};

export function DashboardActionButtons(p: DashboardActionButtonsProps) {
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
