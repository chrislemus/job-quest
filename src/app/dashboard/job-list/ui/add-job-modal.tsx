import { formValidator } from '@common/utils';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { CreateJobDto } from '@app/dashboard/job/dto';
import { useJobLists } from '@app/dashboard/job-list/hooks';
import { useCreateJob } from '@app/dashboard/job/hooks';
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

type NewJobModalContentProps = {
  active: boolean;
  toggleActive: () => void;
};

export function AddJobModal(p: NewJobModalContentProps) {
  const formId = 'new-job';
  const form = useForm<CreateJobDto>({
    resolver: formValidator(CreateJobDto),
  });

  const JobsListQuery = useJobLists();
  const addJobMutation = useCreateJob();

  const jobListOptions = useMemo(() => {
    return JobsListQuery.data?.data?.map((j) => ({
      value: j.id,
      label: j.label,
    }));
  }, [JobsListQuery.data]);

  const errorMsgs = addJobMutation.error?.messages;

  return (
    <Modal active={p.active} toggleActive={p.toggleActive}>
      <Form
        formMethods={form}
        id={formId}
        onValidSubmit={(job) => {
          addJobMutation.mutate(job, {
            onSuccess: () => {
              form.reset();
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
              isInvalid={!!form.formState.errors?.company?.message}
              helperText={form.formState.errors?.company?.message}
            />
            <TextField
              name="title"
              type="text"
              label="Title"
              fullWidth
              isInvalid={!!form.formState.errors?.title?.message}
              helperText={form.formState.errors?.title?.message}
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
            disabled={form.formState.isSubmitting || addJobMutation.isLoading}
            loading={form.formState.isSubmitting || addJobMutation.isLoading}
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
