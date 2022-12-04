'use client';
import { Form, Modal } from '@common/ui/molecules';
import { formValidator } from '@common/utils';
import { jobColors } from '@app/dashboard/job/_ constants';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useBoolean } from '@common/hooks';
import { useRouter } from 'next/navigation';
import { useJobQuery } from '@app/dashboard/job/_query-hooks';
import { UpdateJobDto } from '@app/dashboard/job/_dto';
import { CheckCircleOutlineIcon, OpenInNewIcon } from '@common/ui/icons';
import { useJobListQuery } from '@app/dashboard/job-list/_query-hooks';
import { ApiErrorRes, ApiOkRes } from '@common/api/job-quest/interface';
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
  Box,
} from '@common/ui/atoms';
import { useDeleteJob, useUpdateJob } from '../_hooks';

interface JobProps {
  params: { id: string };
}

export default function Job(p: JobProps) {
  const router = useRouter();
  const jobId = parseInt(p.params.id);
  const formId = 'edit-job';
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

  const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useBoolean();

  const deleteJobMutation = useDeleteJob();

  const jobQuery = useJobQuery(jobId);

  const jobQueryData = jobQuery?.data?.data;

  const formMethods = useForm<UpdateJobDto>({
    resolver: formValidator(UpdateJobDto),
  });

  const JobsListQuery = useJobListQuery();

  const editJobMutation = useUpdateJob();

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
      <Grid container paddingBottom={6}>
        <Grid xs={12}>
          <Form
            formMethods={formMethods}
            id={formId}
            onValidSubmit={(data) => {
              editJobMutation.mutate({ jobId, data });
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
                      color={successCount > 0 ? 'success' : undefined}
                      disabled={
                        formMethods.formState.isSubmitting ||
                        editJobMutation.isLoading
                      }
                      startIcon={
                        successCount > 0 ? (
                          <CheckCircleOutlineIcon />
                        ) : undefined
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
        </Grid>
        <Grid xs={12} paddingTop={6}>
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
                Are you sure you want to this Job?
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
                      deleteJobMutation.mutate(jobId, {
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
        </Grid>
      </Grid>
    </Container>
  );
}
