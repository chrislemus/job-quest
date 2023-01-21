import { useUserProfile } from '@app/user/_query-hooks';
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@common/ui/atoms';
import { Form } from '@common/ui/molecules';
import { PropsWithChildren, useId, useMemo, useState } from 'react';
import { formValidator } from '@common/utils';
import { useForm } from 'react-hook-form';
import { CreateJobLogDto, UpdateJobLogDto } from '../../_dto';
import {
  useCreateJobLog,
  useDeleteJobLog,
  useUpdateJobLog,
} from '../../_hooks';
import { ApiErrorRes } from '@common/api/job-quest/interface';
import { useJobLogsQuery } from '../../_query-hooks';
import { JobLogEntity } from '../../_entities';
import {
  CancelIcon,
  ExpandCircleDownRoundedIcon,
  MoreHorizIcon,
} from '@common/ui/icons';

interface JobLogSectionProps {
  jobId: number;
}

export function JobLogSection(p: JobLogSectionProps) {
  const jobLogsQuery = useJobLogsQuery(p.jobId);
  const jobLogsQueryData = jobLogsQuery.data?.data;

  const logs = useMemo(() => {
    if (jobLogsQueryData) {
      return jobLogsQueryData.map((jobLog) => {
        return (
          <JobLogContainer key={jobLog.id}>
            <JobLog jobLog={jobLog} />
          </JobLogContainer>
        );
      });
    }
  }, [jobLogsQueryData]);

  return (
    <Grid container rowSpacing={2}>
      {logs}
      <JobLogContainer>
        <AddJobLogForm jobId={p.jobId} />
      </JobLogContainer>
    </Grid>
  );
}

interface JobLogProps {
  jobLog: JobLogEntity;
}

function JobLog(p: JobLogProps) {
  const updatedDate = useMemo(
    () => new Date(p.jobLog.updatedAt).toLocaleDateString(),
    [p.jobLog.updatedAt]
  );

  const deleteJobLogMutation = useDeleteJobLog();
  const updateJobLogMutation = useUpdateJobLog();
  const formMethods = useForm<UpdateJobLogDto>({
    resolver: formValidator(UpdateJobLogDto),
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const ITEM_HEIGHT = 48;
  const [displayEditForm, setDisplayEditForm] = useState(false);

  let errorMsgs: undefined | string[];
  const updateJobLogMutationErrors = updateJobLogMutation.error as
    | ApiErrorRes
    | undefined;
  errorMsgs = updateJobLogMutationErrors?.messages;

  return (
    <Box>
      <Grid container paddingY={0}>
        <Grid flexGrow={1} paddingBottom={0}>
          <Typography variant="subtitle2" color="GrayText">
            {updatedDate}
          </Typography>
        </Grid>
        <Grid paddingBottom={0}>
          <IconButton size="small" aria-haspopup="true" onClick={handleClick}>
            <MoreHorizIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{ 'aria-labelledby': 'long-button' }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '20ch',
              },
            }}
          >
            <MenuItem
              onClick={() => {
                formMethods.setValue('content', p.jobLog.content);
                setDisplayEditForm(true);
                handleClose();
              }}
            >
              edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                deleteJobLogMutation.mutate(p.jobLog.id);
                handleClose();
              }}
            >
              delete
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
      {displayEditForm ? (
        <Form
          formMethods={formMethods}
          id="edit-job-log"
          onValidSubmit={(data) => {
            updateJobLogMutation.mutate({ jobLogId: p.jobLog.id, data });
            setDisplayEditForm(false);
          }}
        >
          {/* TODO: replace all inline css/style attributes with mui styles or css/scss modules */}
          <TextField
            name="content"
            fullWidth
            multiline
            placeholder="Add a job log..."
          />
          {/* TODO: remove message after inactivity, or no log is being added.
          For the most part this will be server errors. The only client validation is text length.
        But the user should assume that the log is not being added because text length is '0' */}
          {errorMsgs && (
            <Typography paddingTop={1} color="error" variant="body1">
              {errorMsgs?.join(', ') || 'Error'}
            </Typography>
          )}

          <Grid container paddingBottom={0}>
            <Grid flexGrow={1} paddingBottom={0} />
            <Grid paddingBottom={0}>
              <IconButton
                size="small"
                onClick={() => setDisplayEditForm(false)}
              >
                <CancelIcon />
              </IconButton>
            </Grid>
            <Grid paddingBottom={0}>
              <IconButton
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
      ) : (
        <Typography
          variant="body1"
          style={{ wordWrap: 'break-word', whiteSpace: 'pre-line' }}
        >
          {p.jobLog.content}
        </Typography>
      )}
    </Box>
  );
}

function JobLogContainer(p: PropsWithChildren<{}>) {
  const user = useUserProfile();
  const firstNameInitial = user.data?.firstName?.[0] || '?';

  return (
    <Grid xs={12} paddingY={0}>
      <Grid container columnSpacing={1} flexWrap="nowrap">
        <Grid>
          <Avatar sx={{ width: 24, height: 24 }}>{firstNameInitial}</Avatar>
        </Grid>
        <Grid flexGrow={1} style={{ width: '100%' }}>
          {p.children}
        </Grid>
      </Grid>
    </Grid>
  );
}

interface AddJobLogFormProps {
  jobId: number;
}

function AddJobLogForm(p: AddJobLogFormProps) {
  const formId = useId();
  const formMethods = useForm<CreateJobLogDto>({
    defaultValues: { jobId: p.jobId },
    resolver: formValidator(CreateJobLogDto),
  });
  const createJobLogMutation = useCreateJobLog();

  // const formErrors = formMethods.formState.errors;
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
        console.log(data);
        createJobLogMutation.mutate(data);
      }}
    >
      {/* TODO: replace all inline css/style attributes with mui styles or css/scss modules */}
      <TextField
        name="content"
        fullWidth
        multiline
        placeholder="Add a job log..."
      />
      {/* TODO: remove message after inactivity, or no log is being added.
          For the most part this will be server errors. The only client validation is text length.
        But the user should assume that the log is not being added because text length is '0' */}
      {errorMsgs && (
        <Typography paddingTop={1} color="error" variant="body1">
          {errorMsgs?.join(', ') || 'Error'}
        </Typography>
      )}

      <Grid container>
        <Grid flexGrow={1} />
        <Grid>
          <IconButton
            size="medium"
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
