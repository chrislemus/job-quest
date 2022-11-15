'use client';
import {
  Button,
  ClickAwayListener,
  Container,
  Grid,
  IconButton,
  SelectField,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@common/ui/atoms';
import {
  Form,
  ModalContent,
  ModalContentText,
  ModalTitle,
} from '@common/ui/molecules';
import { formValidator } from '@common/utils';
import { jobListService, jobService } from '@core/job/services';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

interface JobProps {
  params: { id: string };
}
export default function Job(p: JobProps) {
  const jobId = parseInt(p.params.id);
  const formId = 'edit-job';

  const job = useQuery({
    queryKey: ['job', jobId],
    queryFn: () => jobService.findById(jobId),
  });
  const formMethods = useForm({
    defaultValues: {
      title: job.data?.title,
      company: job.data?.company,
      jobListId: job.data?.jobListId,
    },
    // resolver: formValidator(AddJobDto),
  });

  const JobsListQuery = useQuery({
    queryKey: ['jobList'],
    queryFn: jobListService.getAll,
  });

  const editJobMutation = useMutation({
    mutationFn: jobService.addJob,
    onSuccess(data) {
      // queryClient.invalidateQueries({
      //   queryKey: ['jobs', { jobListId: data.jobListId }],
      // });
    },
  });

  const jobListOptions = useMemo(() => {
    return JobsListQuery.data?.map((j) => ({
      value: j.id,
      label: j.label,
    }));
  }, [JobsListQuery.data]);

  const errorMsg: string = '';

  return (
    <Container>
      <Form
        formMethods={formMethods}
        id={formId}
        onValidSubmit={(job) => {
          console.log(job);
          // editJobMutation.mutate(job);
        }}
      >
        <Grid container paddingTop={2} spacing={3}>
          {job.isLoading ? (
            <Grid xs={12}>
              <Skeleton height={500} />
            </Grid>
          ) : (
            <>
              <Grid xs={12}>
                <Grid container rowSpacing={1}>
                  <Grid xs={10}>
                    <Typography variant="h4">{job?.data?.title}</Typography>
                    <Typography variant="subtitle1">
                      {job?.data?.company}
                    </Typography>
                  </Grid>

                  <Grid xs={5} sm={3} md={2}>
                    {jobListOptions && (
                      <SelectField
                        name="jobListId"
                        label=""
                        variant="standard"
                        defaultValue={job.data?.jobListId}
                        options={jobListOptions}
                      />
                    )}
                  </Grid>
                </Grid>
              </Grid>

              <Grid xs={12} sm={6}>
                <TextField
                  name="title"
                  type="text"
                  label="title"
                  fullWidth
                  // isInvalid={!!formMethods.formState.errors?.company?.message}
                  // helperText={formMethods.formState.errors?.company?.message}
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField
                  name="company"
                  type="text"
                  label="Company"
                  fullWidth
                  // isInvalid={!!formMethods.formState.errors?.company?.message}
                  // helperText={formMethods.formState.errors?.company?.message}
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField
                  name="jobUrl"
                  type="text"
                  label="Job Url"
                  fullWidth
                  // isInvalid={!!formMethods.formState.errors?.company?.message}
                  // helperText={formMethods.formState.errors?.company?.message}
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField
                  name="location"
                  type="text"
                  label="Location"
                  fullWidth
                  // isInvalid={!!formMethods.formState.errors?.company?.message}
                  // helperText={formMethods.formState.errors?.company?.message}
                />
              </Grid>
              <Grid xs={8} sm={6}>
                <TextField
                  name="salary"
                  type="text"
                  label="Salary"
                  fullWidth
                  // isInvalid={!!formMethods.formState.errors?.company?.message}
                  // helperText={formMethods.formState.errors?.company?.message}
                />
              </Grid>
              <Grid xs={4} sm={2}>
                <TextField
                  name="jobCardColor"
                  type="text"
                  label="Color"
                  fullWidth
                  // isInvalid={!!formMethods.formState.errors?.company?.message}
                  // helperText={formMethods.formState.errors?.company?.message}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  name="description"
                  type="text"
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  // isInvalid={!!formMethods.formState.errors?.company?.message}
                  // helperText={formMethods.formState.errors?.company?.message}
                />
              </Grid>
            </>
          )}
        </Grid>
      </Form>
    </Container>
  );
}
