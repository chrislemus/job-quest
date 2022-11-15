'use client';
import {
  Button,
  ClickAwayListener,
  Container,
  Grid,
  IconButton,
  MenuItem,
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
import { jobBackgroundColors } from '@core/job/const';
import { EditJobDto } from '@core/job/dto';
import { JobEntity } from '@core/job/entities';
import { jobListService, jobService } from '@core/job/services';
import { Select } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useMutation, useQuery } from '@tanstack/react-query';
import { plainToClass } from 'class-transformer';
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
  const formMethods = useForm<EditJobDto>({
    // defaultValues: {
    //   title: job.data?.title,
    //   company: job.data?.company,
    //   jobListId: job.data?.jobListId,
    // },
    resolver: formValidator(EditJobDto),
    // mode: 'onBlur',
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

  if (job.isLoading)
    return (
      <Grid xs={12}>
        <Skeleton height={500} />
      </Grid>
    );

  const inputBlurSubmit = (e) => {
    console.log(e);
  };

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
          <Grid xs={12}>
            <Grid container paddingLeft={0}>
              <Grid flexGrow={1}>
                <Typography variant="h4">{job?.data?.title}</Typography>
                <Typography variant="subtitle1">
                  {job?.data?.company}
                </Typography>
              </Grid>

              <Grid>
                <Button variant="contained" type="submit">
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              name="title"
              label="title"
              defaultValue={job.data?.title || undefined}
              fullWidth
              onBlur={inputBlurSubmit}
              isInvalid={!!formMethods.formState.errors?.title?.message}
              helperText={formMethods.formState.errors?.title?.message}
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              name="company"
              type="text"
              label="Company"
              fullWidth
              onBlur={inputBlurSubmit}
              defaultValue={job.data?.company || undefined}
              isInvalid={!!formMethods.formState.errors?.company?.message}
              helperText={formMethods.formState.errors?.company?.message}
            />
          </Grid>
          <Grid xs={8} sm={3} md={2}>
            {jobListOptions && (
              <SelectField
                name="jobListId"
                label="Job List"
                onBlur={inputBlurSubmit}
                defaultValue={job.data?.jobListId}
                options={jobListOptions}
              />
            )}
          </Grid>
          <Grid xs={4} sm={2}>
            <SelectField
              name="backgroundColor"
              label="Color"
              onBlur={inputBlurSubmit}
              defaultValue={job.data?.backgroundColor}
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
                    ></div>
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
              onBlur={inputBlurSubmit}
              isInvalid={!!formMethods.formState.errors?.url?.message}
              helperText={formMethods.formState.errors?.url?.message}
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              name="location"
              label="Location"
              onBlur={inputBlurSubmit}
              defaultValue={job.data?.location || undefined}
              fullWidth
              isInvalid={!!formMethods.formState.errors?.location?.message}
              helperText={formMethods.formState.errors?.location?.message}
            />
          </Grid>

          <Grid xs={8} sm={6} md={3}>
            <TextField
              name="salary"
              label="Salary"
              onBlur={inputBlurSubmit}
              setValueAs={(val) => {
                if (val === '') return null;
                return parseInt(val);
              }}
              defaultValue={job.data?.salary || undefined}
              fullWidth
              isInvalid={!!formMethods.formState.errors?.salary?.message}
              helperText={formMethods.formState.errors?.salary?.message}
            />
          </Grid>
          <Grid xs={4} sm={6} md={9} />

          <Grid xs={12}>
            <TextField
              name="description"
              label="Description"
              defaultValue={job.data?.description || undefined}
              fullWidth
              multiline
              onBlur={inputBlurSubmit}
              rows={4}
              isInvalid={!!formMethods.formState.errors?.description?.message}
              helperText={formMethods.formState.errors?.description?.message}
            />
          </Grid>
        </Grid>
      </Form>
    </Container>
  );
}
