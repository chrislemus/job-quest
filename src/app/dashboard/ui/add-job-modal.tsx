import {
  Button,
  SelectField,
  Stack,
  TextField,
  Typography,
} from '@common/ui/atoms';
import { formValidator } from '@common/utils';
import { jobListService, jobService } from '@core/job/services';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { CreateJobDto } from '@core/job/dto';
import {
  Form,
  Modal,
  ModalActions,
  ModalContent,
  ModalContentText,
  ModalTitle,
} from '@common/ui/molecules';
import { ApiErrorRes } from '@core/http/job-quest/interface';
import { queryClient } from '@common/query-client';

interface NewJobModalContentProps {
  active: boolean;
  toggleActive: () => void;
}

export function AddJobModal(p: NewJobModalContentProps) {
  const formId = 'new-job';
  const formMethods = useForm<CreateJobDto>({
    resolver: formValidator(CreateJobDto),
  });

  const JobsListQuery = useQuery({
    queryKey: ['jobList'],
    queryFn: jobListService.getAll,
  });

  const addJobMutation = useMutation({
    mutationFn: jobService.createJob,
    onSuccess(res) {
      queryClient.invalidateQueries({
        queryKey: ['jobs', { jobListId: res.data.jobListId }],
      });
      formMethods.reset();
      p.toggleActive();
    },
  });

  const jobListOptions = useMemo(() => {
    return JobsListQuery.data?.data?.map((j) => ({
      value: j.id,
      label: j.label,
    }));
  }, [JobsListQuery.data]);

  let errorMsgs: undefined | string[];
  const addJobMutationErrors = addJobMutation.error as ApiErrorRes | undefined;
  errorMsgs = addJobMutationErrors?.messages;

  return (
    <Modal active={p.active} toggleActive={p.toggleActive}>
      <Form
        formMethods={formMethods}
        id={formId}
        onValidSubmit={(job) => {
          addJobMutation.mutate(job);
        }}
      >
        <ModalTitle>Add a Job</ModalTitle>
        <ModalContent>
          <ModalContentText>
            Quickly add job by entering formation below.
          </ModalContentText>

          {errorMsgs && (
            <Typography paddingTop={1} color="error" variant="body1">
              {errorMsgs?.map((msg, idx) => {
                return <li key={idx}>{msg}</li>;
              }) || 'Error'}
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
