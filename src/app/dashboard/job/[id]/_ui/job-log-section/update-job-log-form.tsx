import { UpdateJobLogDto } from '@app/dashboard/job/_dto';
import { JobLogEntity } from '@app/dashboard/job/_entities';
import { Grid, IconButton, TextField, Typography } from '@common/ui/atoms';
import { CancelIcon, ExpandCircleDownRoundedIcon } from '@common/ui/icons';
import { Form } from '@common/ui/molecules';
import { useForm } from 'react-hook-form';
import { formValidator } from '@common/utils';
import { useUpdateJobLog } from '@app/dashboard/job/_hooks';

export interface UpdateJobLogFormProps {
  jobLog: JobLogEntity;
  disableForm: () => void;
}

export function UpdateJobLogForm(p: UpdateJobLogFormProps) {
  const formMethods = useForm<UpdateJobLogDto>({
    resolver: formValidator(UpdateJobLogDto),
  });
  formMethods.formState.isValid;
  const content = formMethods.watch('content');
  const updateJobLogMutation = useUpdateJobLog();
  const errorMsgs = updateJobLogMutation.error?.messages;

  return (
    <Form
      formMethods={formMethods}
      id="update-job-log"
      onValidSubmit={(data) => {
        updateJobLogMutation.mutate({ jobLogId: p.jobLog.id, data });
        p.disableForm();
      }}
    >
      {/* TODO: check console.warning: 
      
      TextareaAutosize limits the number of renders to
      prevent an infinite loop. ;

      this only happens with multiline text.
      - one solution is to specify number of rows
      - or if implementing MDX to enable markdown, the issue may go away */}

      <TextField
        name="content"
        fullWidth
        multiline
        defaultValue={p.jobLog.content}
      />
      {!!errorMsgs && (
        <Typography paddingTop={1} color="error" variant="body1">
          {updateJobLogMutation.error?.messages?.join(', ') || 'Error'}
        </Typography>
      )}
      <Grid container paddingBottom={0}>
        <Grid flexGrow={1} paddingBottom={0} />
        <Grid paddingBottom={0}>
          <IconButton size="small" onClick={p.disableForm}>
            <CancelIcon />
          </IconButton>
        </Grid>
        <Grid paddingBottom={0}>
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
