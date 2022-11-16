'use client';
import { queryClient } from '@app/layout';
import { Form } from '@common/ui/molecules';
import { formValidator } from '@common/utils';
import { jobBackgroundColors } from '@core/job/const';
import { EditJobDto } from '@core/job/dto';
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

  const formMethods = useForm<EditJobDto>({
    resolver: formValidator(EditJobDto),
  });

  const JobsListQuery = useQuery({
    queryKey: ['jobList'],
    queryFn: jobListService.getAll,
  });

  const editJobMutation = useMutation({
    mutationFn: (job: EditJobDto) => {
      return jobService.editJob(jobId, job);
    },
    onSuccess(_data) {
      queryClient.invalidateQueries({
        queryKey: ['job', jobId],
      });
    },
  });

  const jobListOptions = useMemo(() => {
    return JobsListQuery.data?.map((j) => ({
      value: j.id,
      label: j.label,
    }));
  }, [JobsListQuery.data]);

  let errorMsg: string = '';

  if (jobQuery.isLoading)
    return (
      <Grid xs={12}>
        <Skeleton height={500} />
      </Grid>
    );

  const formErrors = formMethods.formState.errors;

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
                <Typography variant="h4">{jobQuery?.data?.title}</Typography>
                <Typography variant="subtitle1">
                  {jobQuery?.data?.company}
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
            {errorMsg && (
              <Typography paddingTop={1} color="error">
                {errorMsg}
              </Typography>
            )}
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              name="title"
              label="title"
              defaultValue={jobQuery.data?.title || undefined}
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
              defaultValue={jobQuery.data?.company || undefined}
              isInvalid={!!formErrors?.company?.message}
              helperText={formErrors?.company?.message}
            />
          </Grid>
          <Grid xs={8} sm={3} md={2}>
            {jobListOptions && (
              <SelectField
                name="jobListId"
                label="Job List"
                defaultValue={jobQuery.data?.jobListId}
                options={jobListOptions}
              />
            )}
          </Grid>
          <Grid xs={4} sm={2}>
            <SelectField
              name="backgroundColor"
              label="Color"
              defaultValue={jobQuery.data?.backgroundColor}
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
              setValueAs={(val) => {
                if (!val.startsWith('http') && val?.length > 0) {
                  return `https://${val}`;
                }
                return val;
              }}
              onBlur={(e) => {
                const value = e.target?.value;
                if (value) {
                  if (!value.startsWith('http') && value?.length > 0) {
                    e.target.value = `https://${value}`;
                  }
                }
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="job url"
                    href={jobQuery.data?.url as any}
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
              defaultValue={jobQuery.data?.location || undefined}
              fullWidth
              isInvalid={!!formErrors?.location?.message}
              helperText={formErrors?.location?.message}
            />
          </Grid>

          <Grid xs={8} sm={6} md={3}>
            <TextField
              name="salary"
              label="Salary"
              defaultValue={jobQuery.data?.salary || undefined}
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
              defaultValue={jobQuery.data?.description || undefined}
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
