'use client';
import { Modal } from '@common/ui/molecules';
import { useBoolean } from '@common/hooks';
import { useRouter } from 'next/navigation';
import { useDeleteJob } from '@app/dashboard/job/_hooks';
import { Button, Grid, Box, Typography } from '@common/ui/atoms';

type DeleteJobButtonProps = {
  jobId: number;
};

export function DeleteJobButton(p: DeleteJobButtonProps) {
  const router = useRouter();
  const deleteJobMutation = useDeleteJob();
  const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useBoolean();

  return (
    <>
      <Button
        color="error"
        variant="outlined"
        onClick={setDeleteConfirmModalOpen.on}
      >
        Delete
      </Button>
      <Modal
        active={deleteConfirmModalOpen}
        toggleActive={setDeleteConfirmModalOpen.off}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box padding={4}>
          <Typography id="modal-modal-description">
            Are you sure you want to delete this Job?
          </Typography>
          {/* 
              TODO: add error response messages 
        */}
          <Grid container justifyContent="space-around" paddingTop={6}>
            <Grid paddingRight={2}>
              <Button
                color="error"
                variant="outlined"
                disabled={deleteJobMutation.isLoading}
                loading={deleteJobMutation.isLoading}
                onClick={() => {
                  deleteJobMutation.mutate(p.jobId, {
                    onSuccess: () => {
                      router.push('/dashboard');
                    },
                  });
                }}
              >
                Delete
              </Button>
            </Grid>
            <Grid>
              <Button
                color="info"
                variant="contained"
                onClick={setDeleteConfirmModalOpen.off}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
