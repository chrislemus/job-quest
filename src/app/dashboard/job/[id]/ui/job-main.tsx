'use client';
import { Form } from '@common/ui/molecules';
import { formValidator } from '@common/utils';
import { jobColors } from '@app/dashboard/job/constants';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UpdateJobDto } from '@app/dashboard/job/dto';
import { CheckCircleOutlineIcon, OpenInNewIcon } from '@common/ui/icons';
import { useJobLists } from '@app/dashboard/job-list/hooks';
import { useUpdateJob } from '@app/dashboard/job/hooks';
import { JobEntity } from '@api/job-quest/job/job.entity';
import {
  Button,
  Grid,
  IconButton,
  SelectField,
  TextField,
  Typography,
  InputAdornment,
} from '@common/ui/atoms';

type JobMainProps = {
  job: JobEntity;
};

export function JobMain(p: JobMainProps) {
  const formId = 'edit-job';
  const editJobMutation = useUpdateJob();

  const shouldFormatJobUrl = (value: string) => {
    return !value.startsWith('http') && value?.length > 0;
  };

  const formMethods = useForm<UpdateJobDto>({
    resolver: formValidator(UpdateJobDto),
  });

  const formErrors = formMethods.formState.errors;

  const JobsListQuery = useJobLists();

  const jobListOptions = useMemo(() => {
    return JobsListQuery.data?.data?.map((j) => ({
      value: j.id,
      label: j.label,
    }));
  }, [JobsListQuery.data]);

  const [successCount, setSuccessCount] = useState(0);

  useEffect(() => {
    if (successCount > 0) {
      const timeOut = setTimeout(() => {
        setSuccessCount((count) => count - 1);
      }, 1000);
      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [successCount]);

  const errorMsgs = editJobMutation.error?.messages;

  return (
    <Grid>
      <Grid xs={12}>
        <Form
          formMethods={formMethods}
          id={formId}
          onValidSubmit={(data) => {
            editJobMutation.mutate({ jobId: p.job.id, data });
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
                defaultValue={p.job.title || undefined}
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
                defaultValue={p.job.company || undefined}
                isInvalid={!!formErrors?.company?.message}
                helperText={formErrors?.company?.message}
              />
            </Grid>
            <Grid xs={8} sm={3} md={2}>
              {jobListOptions && (
                <SelectField
                  name="jobListId"
                  label="Job List"
                  defaultValue={p.job.jobListId}
                  options={jobListOptions}
                />
              )}
            </Grid>
            <Grid xs={4} sm={2}>
              <SelectField
                name="color"
                label="Color"
                defaultValue={p.job.color}
                options={jobColors.map((color) => {
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
                defaultValue={p.job.url || undefined}
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
                      href={p.job.url as any}
                      disabled={!p.job.url}
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
                defaultValue={p.job.location || undefined}
                fullWidth
                isInvalid={!!formErrors?.location?.message}
                helperText={formErrors?.location?.message}
              />
            </Grid>

            <Grid xs={8} sm={6} md={3}>
              <TextField
                name="salary"
                label="Salary"
                defaultValue={p.job.salary || undefined}
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
                defaultValue={p.job.description || undefined}
                fullWidth
                multiline
                rows={4}
                isInvalid={!!formErrors?.description?.message}
                helperText={formErrors?.description?.message}
              />
            </Grid>
            <Grid>
              <Button
                variant="contained"
                type="submit"
                color={successCount > 0 ? 'success' : undefined}
                disabled={
                  formMethods.formState.isSubmitting ||
                  editJobMutation.isLoading
                }
                startIcon={
                  successCount > 0 ? <CheckCircleOutlineIcon /> : undefined
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
        </Form>
      </Grid>
    </Grid>
  );
}
