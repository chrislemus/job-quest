import { Button, SelectField, TextField } from '@common/ui/atoms';
import { formValidator } from '@common/utils';
import { jobListService, jobService } from '@core/job/services';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Stack, Typography } from '@mui/material';
import { AddJobDto } from '@core/job/dto';
import { queryClient } from '@app/layout';
import {
  Form,
  Modal,
  ModalActions,
  ModalContent,
  ModalContentText,
  ModalTitle,
} from '@common/ui/molecules';

interface NewJobModalContentProps {
  active: boolean;
  toggleActive: () => void;
}

export function AddJobModal(p: NewJobModalContentProps) {
  const formMethods = useForm<AddJobDto>({
    resolver: formValidator(AddJobDto),
  });

  const formId = 'new-job';

  const JobsListQuery = useQuery({
    queryKey: ['jobList'],
    queryFn: jobListService.getAll,
  });

  const addJobMutation = useMutation({
    mutationFn: jobService.addJob,
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ['jobs', { jobListId: data.jobListId }],
      });
      formMethods.reset();
      p.toggleActive();
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
    <Modal active={p.active} toggleActive={p.toggleActive}>
      <Form
        formMethods={formMethods}
        id={formId}
        onValidSubmit={(job) => {
          console.log(job);
          const addedJob = addJobMutation.mutate(job);
        }}
      >
        <ModalTitle>Log In</ModalTitle>
        <ModalContent>
          {/* {JSON.stringify(form.formState.isSubmitted)} */}
          <ModalContentText>
            Welcome back! Enter your account info below to continue.
          </ModalContentText>

          {errorMsg && (
            <Typography paddingTop={1} color="error">
              {errorMsg}
            </Typography>
          )}
          <br />
          <Stack spacing={2}>
            <TextField
              name="company"
              type="text"
              label="Company"
              fullWidth
              isInvalid={!!formMethods.formState.errors?.company?.message}
              helperText={formMethods.formState.errors?.company?.message}
            />
            <TextField
              name="title"
              type="text"
              label="Title"
              fullWidth
              isInvalid={!!formMethods.formState.errors?.title?.message}
              helperText={formMethods.formState.errors?.title?.message}
            />
            {jobListOptions && (
              <SelectField
                name="jobListId"
                label="List"
                defaultValue={jobListOptions?.[0].value}
                options={jobListOptions}
              />
            )}
          </Stack>
        </ModalContent>
        <ModalActions>
          <Button
            color="primary"
            type="submit"
            variant="contained"
            form={formId}
            disabled={
              formMethods.formState.isSubmitting || addJobMutation.isLoading
            }
            loading={
              formMethods.formState.isSubmitting || addJobMutation.isLoading
            }
          >
            Add
          </Button>
          <Button type="button" onClick={p.toggleActive}>
            Cancel
          </Button>
        </ModalActions>
      </Form>
    </Modal>
  );
}