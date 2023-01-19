import { useUserProfile } from '@app/user/_query-hooks';
import { Avatar, Grid, TextField, Typography } from '@common/ui/atoms';
import { Form } from '@common/ui/molecules';
import { PropsWithChildren, useId } from 'react';
import { formValidator } from '@common/utils';
import { useForm } from 'react-hook-form';
import { CreateJobLogDto } from '../../_dto';
import { useCreateJobLog } from '../../_hooks';
import { ApiErrorRes } from '@common/api/job-quest/interface';

export function JobLog() {
  return (
    <Grid container rowSpacing={2}>
      <JobLogContainer>dwed</JobLogContainer>
      <JobLogContainer>dwed</JobLogContainer>
      <JobLogContainer>
        <AddJobLogForm />
      </JobLogContainer>
    </Grid>
  );
}

function JobLogContainer(p: PropsWithChildren<{}>) {
  const user = useUserProfile();
  const firstNameInitial = user.data?.firstName?.[0] || '?';

  return (
    <Grid container rowSpacing={1} columnSpacing={1} xs={12}>
      <Grid>
        <Avatar sx={{ width: 24, height: 24 }}>{firstNameInitial}</Avatar>
      </Grid>
      <Grid flexGrow={1}>{p.children}</Grid>
    </Grid>
  );
}

function AddJobLogForm() {
  const formId = useId();
  const formMethods = useForm<CreateJobLogDto>({
    resolver: formValidator(CreateJobLogDto),
  });
  const createJobLogMutation = useCreateJobLog();

  const formErrors = formMethods.formState.errors;
  let errorMsgs: undefined | string[];
  const addJobLogMutationErrors = createJobLogMutation.error as
    | ApiErrorRes
    | undefined;
  errorMsgs = addJobLogMutationErrors?.messages;

  return (
    <Form
      formMethods={formMethods}
      id={formId}
      onValidSubmit={(data) => {
        // editJobMutation.mutate({ jobId: p.job.id, data });
      }}
    >
      <Grid container paddingTop={2} spacing={3}>
        <Grid xs={12}>
          {errorMsgs && (
            <Typography paddingTop={1} color="error" variant="body1">
              {errorMsgs?.map((msg, idx) => {
                return <li key={idx}>{msg}</li>;
              }) || 'Error'}
            </Typography>
          )}
        </Grid>
        <Grid xs={12} sm={6}>
          <TextField
            name="title"
            label="title"
            // defaultValue={p.job.title || undefined}
            fullWidth
            // isInvalid={!!formErrors?.title?.message}
            // helperText={formErrors?.title?.message}
          />
        </Grid>{' '}
      </Grid>
    </Form>
  );
}
