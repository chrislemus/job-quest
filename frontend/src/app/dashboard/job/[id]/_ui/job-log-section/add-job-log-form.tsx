import { useForm } from 'react-hook-form';
import { formValidator } from '@common/utils';
import { CreateJobLogDto } from '@app/dashboard/job/_dto';
import { useCreateJobLog } from '@app/dashboard/job-log/_hooks';
import { Form } from '@common/ui/molecules';
import { Grid, IconButton, TextField, Typography } from '@common/ui/atoms';
import { ExpandCircleDownRoundedIcon } from '@common/ui/icons';

type AddJobLogFormProps = {
  jobId: number;
};

export function AddJobLogForm(p: AddJobLogFormProps) {
  const formMethods = useForm<CreateJobLogDto>({
    defaultValues: { jobId: p.jobId },
    resolver: formValidator(CreateJobLogDto),
  });

  const content = formMethods.watch('content');
  const createJobLogMutation = useCreateJobLog();
  const errorMsgs = createJobLogMutation.error?.messages;

  return (
    <Form
      formMethods={formMethods}
      id="add-job-log"
      onValidSubmit={(data) => {
        createJobLogMutation.mutate(data, {
          onSuccess: () => {
            formMethods.reset();
          },
        });
      }}
    >
      <TextField
        name="content"
        fullWidth
        multiline
        placeholder="Add a job log..."
      />

      {errorMsgs && (
        <Typography paddingTop={1} color="error" variant="body1">
          {errorMsgs?.join(', ') || 'Error'}
        </Typography>
      )}

      <Grid container paddingBottom={0}>
        <Grid flexGrow={1} />
        <Grid>
          <IconButton
            disabled={!(content?.length > 0)}
            size="small"
            type="submit"
            color="primary"
            sx={{ rotate: '180deg' }}
          >
            <ExpandCircleDownRoundedIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Form>
  );
}
