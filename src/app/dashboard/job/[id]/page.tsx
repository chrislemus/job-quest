'use client';
import { queryClient } from '@app/layout';
import { Form } from '@common/ui/molecules';
import { formValidator } from '@common/utils';
import { jobBackgroundColors } from '@core/job/const';
import { UpdateJobDto } from '@core/job/dto';
import { jobListService, jobService } from '@core/job/services';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { OpenInNewIcon } from '@common/ui/icons';
import {
  Button,
  Container,
  Grid,
  IconButton,
  SelectField,
  Skeleton,
  TextField,
  Typography,
  InputAdornment,
} from '@common/ui/atoms';
import Link from 'next/link';
import {
  ApiErrorRes,
  ApiOkRes,
  ApiPageRes,
} from '@core/http/job-quest/interface';
import { JobEntity, JobListEntity } from '@core/job/entities';
import { ApiError } from 'next/dist/server/api-utils';

interface JobProps {
  params: { id: string };
}
export default function Job(p: JobProps) {
  const jobId = parseInt(p.params.id);
  const formId = 'edit-job';

  const jobQuery = useQuery({
    queryKey: ['job', jobId],
    queryFn: () => jobService.findById(jobId),
  });

  const jobQueryData = jobQuery?.data?.data;

  const formMethods = useForm<UpdateJobDto>({
    resolver: formValidator(UpdateJobDto),
  });

  const JobsListQuery = useQuery<ApiPageRes<JobListEntity>, ApiError>({
    queryKey: ['jobList'],
    queryFn: jobListService.getAll,
  });

  const editJobMutation = useMutation({
    // mutationKey: [UpdateJobDto],
    mutationFn: (job: UpdateJobDto) => {
      return jobService.updateJob(jobId, job);
    },
    onSuccess(data: ApiOkRes<JobEntity>) {
      queryClient.invalidateQueries({
        queryKey: ['job', jobId],
      });

      queryClient.invalidateQueries({
        queryKey: ['jobs', { jobListId: data.data.jobListId }],
      });
    },
  });

  const jobListOptions = useMemo(() => {
    return JobsListQuery.data?.data?.map((j) => ({
      value: j.id,
      label: j.label,
    }));
  }, [JobsListQuery.data]);

  let errorMsgs: undefined | string[];
  const editJobMutationErrors = editJobMutation.error as
    | ApiErrorRes
    | undefined;
  errorMsgs = editJobMutationErrors?.messages;

  if (jobQuery.isLoading)
    return (
      <Grid xs={12}>
        <Skeleton height={500} />
      </Grid>
    );

  const formErrors = formMethods.formState.errors;

  const shouldFormatJobUrl = (value: string) => {
    return !value.startsWith('http') && value?.length > 0;
  };

  return (
    <Container>
      <Form
        formMethods={formMethods}
        id={formId}
        onValidSubmit={(data) => {
          editJobMutation.mutate(data);
        }}
      >
        <Grid container paddingTop={2} spacing={3}>
          <Grid xs={12}>
            <Grid container paddingLeft={0}>
              <Grid flexGrow={1}>
                <Typography variant="h4">{jobQueryData?.title}</Typography>
                <Typography variant="subtitle1">
                  {jobQueryData?.company}
                </Typography>
              </Grid>

              <Grid>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={
                    formMethods.formState.isSubmitting ||
                    editJobMutation.isLoading
                  }
                  loading={
                    formMethods.formState.isSubmitting ||
                    editJobMutation.isLoading
                  }
                >
                  Save
                </Button>
              </Grid>
            </Grid>
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
              defaultValue={jobQueryData?.title || undefined}
              fullWidth
              isInvalid={!!formErrors?.title?.message}
              helperText={formErrors?.title?.message}
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              name="company"
              type="text"
              label="Company"
              fullWidth
              defaultValue={jobQueryData?.company || undefined}
              isInvalid={!!formErrors?.company?.message}
              helperText={formErrors?.company?.message}
            />
          </Grid>
          <Grid xs={8} sm={3} md={2}>
            {jobListOptions && (
              <SelectField
                name="jobListId"
                label="Job List"
                defaultValue={jobQueryData?.jobListId}
                options={jobListOptions}
              />
            )}
          </Grid>
          <Grid xs={4} sm={2}>
            <SelectField
              name="color"
              label="Color"
              defaultValue={jobQueryData?.color}
              options={jobBackgroundColors.map((color) => {
                return {
                  value: color,
                  label: (
                    <div
                      style={{
                        height: '1rem',
                        width: '100%',
                        backgroundColor: color,
                        color: '#ffff',
                        padding: '2px',
                      }}
                    />
                  ),
                };
              })}
            />
          </Grid>
          <Grid xs={0} sm={7} md={8} />
          <Grid xs={12} sm={6}>
            <TextField
              name="url"
              label="Job Url"
              fullWidth
              defaultValue={jobQueryData?.url || undefined}
              setValueAs={(val) => {
                if (val?.length === 0) return '';
                if (shouldFormatJobUrl(val)) return `https://${val}`;
                return val;
              }}
              onBlur={(e) => {
                const value = e.target?.value;
                if (shouldFormatJobUrl(value)) {
                  e.target.value = `https://${value}`;
                }
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="job url"
                    href={jobQueryData?.url as any}
                    disabled={!jobQueryData?.url}
                    target="_blank"
                    LinkComponent={Link}
                    edge="end"
                  >
                    <OpenInNewIcon />
                  </IconButton>
                </InputAdornment>
              }
              isInvalid={!!formErrors?.url?.message}
              helperText={formErrors?.url?.message}
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              name="location"
              label="Location"
              defaultValue={jobQueryData?.location || undefined}
              fullWidth
              isInvalid={!!formErrors?.location?.message}
              helperText={formErrors?.location?.message}
            />
          </Grid>

          <Grid xs={8} sm={6} md={3}>
            <TextField
              name="salary"
              label="Salary"
              defaultValue={jobQueryData?.salary || undefined}
              fullWidth
              isInvalid={!!formErrors?.salary?.message}
              helperText={formErrors?.salary?.message}
            />
          </Grid>
          <Grid xs={4} sm={6} md={9} />

          <Grid xs={12}>
            <TextField
              name="description"
              label="Description"
              defaultValue={jobQueryData?.description || undefined}
              fullWidth
              multiline
              rows={4}
              isInvalid={!!formErrors?.description?.message}
              helperText={formErrors?.description?.message}
            />
          </Grid>
        </Grid>
      </Form>
    </Container>
  );
}
