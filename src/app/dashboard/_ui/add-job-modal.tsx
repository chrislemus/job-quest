import { formValidator } from '@common/utils';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { CreateJobDto } from '@app/dashboard/job/_dto';
import { ApiErrorRes } from '@common/api/job-quest/interface';
import { queryClient } from '@common/query-client';
import { useJobListQuery } from '../job-list/_query-hooks';
import { useCreateJob } from '../job/_hooks';
import { jobQueryKeyFactory } from '../job/factories';
import {
  Button,
  SelectField,
  Stack,
  TextField,
  Typography,
} from '@common/ui/atoms';
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
  const formId = 'new-job';
  const formMethods = useForm<CreateJobDto>({
    resolver: formValidator(CreateJobDto),
  });

  const JobsListQuery = useJobListQuery();

  const addJobMutation = useCreateJob();

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
        onValidSubmit={async (job) => {
          await addJobMutation.mutateAsync(job, {
            // TODO: move this logic within create job query.
            // but handle case where user wants to edit right away.
            // eg. how would routing work? /job/:ID?
            onSuccess: async () => {
              await queryClient.invalidateQueries({
                queryKey: jobQueryKeyFactory.all({ jobListId: job.jobListId }),
              });
              formMethods.reset();
              p.toggleActive();
            },
          });
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
