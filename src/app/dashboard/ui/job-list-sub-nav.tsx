import {
  Grid,
  Skeleton,
  Button,
  Typography,
  TextField,
} from '@common/ui/atoms';
import {
  Form,
  Modal,
  ModalActions,
  ModalContent,
  ModalContentText,
  ModalTitle,
} from '@common/ui/molecules';
import { formValidator } from '@common/utils';
import { jobListService } from '@core/job/services';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Controller, useForm, useFormContext } from 'react-hook-form';

interface SelectFieldProps {
  name: string;
  label: string;
  options: { value: any; label: string }[];
}

class AddQuickJobDto {
  company: string;
  title: string;
  jobList: string;
}

function SelectField(p: SelectFieldProps) {
  const { control } = useFormContext(); // retrieve all hook methods
  const fieldId = `select-field-${p.name}`;
  const labelId = `${fieldId}-label`;

  return (
    <FormControl fullWidth>
      <InputLabel id={labelId}>List</InputLabel>
      <Controller
        control={control}
        name={p.name}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Select
            value={value || p.options[0]?.value}
            labelId={labelId}
            label={p.label}
            id={fieldId}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
          >
            {p.options?.map((o, idx) => {
              return (
                <MenuItem value={o.value} key={idx}>
                  {o.label}
                </MenuItem>
              );
            })}
          </Select>
        )}
      />
    </FormControl>
  );
}

interface NewJobModalContentProps {
  onModalToggle: () => void;
}

function NewJobModalContent(p: NewJobModalContentProps) {
  const formMethods = useForm<AddQuickJobDto>({
    resolver: formValidator(AddQuickJobDto),
  });
  const formId = 'new-job';

  const JobsListQuery = useQuery({
    queryKey: ['jobList'],
    queryFn: jobListService.getAll,
  });

  const newJobMutation = useMutation({});

  return (
    <Form
      formMethods={formMethods}
      id={formId}
      onValidSubmit={(e) => {
        console.log(e);
      }}
    >
      <ModalTitle>Log In</ModalTitle>
      <ModalContent>
        {/* {JSON.stringify(form.formState.isSubmitted)} */}
        <ModalContentText>
          Welcome back! Enter your account info below to continue.
        </ModalContentText>

        {/* {errorMsg && ( */}
        <Typography paddingTop={1} color="error">
          error Message
        </Typography>
        {/* )} */}
        <br />
        <Stack spacing={2}>
          <TextField
            name="company"
            type="text"
            label="Company"
            fullWidth
            // isInvalid={!!form.formState.errors?.email?.message}
            // helperText={form.formState.errors?.email?.message}
          />
          <TextField
            name="title"
            type="text"
            label="Title"
            fullWidth
            // isInvalid={!!form.formState.errors?.email?.message}
            // helperText={form.formState.errors?.email?.message}
          />
          {JobsListQuery.data && (
            <SelectField
              name="jobList"
              label="List"
              options={JobsListQuery.data.map((j) => ({
                value: j.id,
                label: j.label,
              }))}
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
            formMethods.formState.isSubmitting || newJobMutation.isLoading
          }
          loading={
            formMethods.formState.isSubmitting || newJobMutation.isLoading
          }
        >
          Add
        </Button>
        <Button type="button" onClick={p.onModalToggle}>
          Cancel
        </Button>
      </ModalActions>
    </Form>
  );
}

interface JobListSubNavProps {
  loading?: boolean;
}

export function JobListSubNav(p: JobListSubNavProps) {
  const [activeModal, setActiveModal] = useState<'new-job' | null>(null);
  const removeModal = () => setActiveModal(null);

  return (
    <>
      {p.loading ? (
        <Skeleton variant="rectangular" height={60} />
      ) : (
        <Grid container justifyContent="flex-end" paddingTop={2}>
          <Modal active={!!activeModal} toggleActive={removeModal}>
            <NewJobModalContent onModalToggle={removeModal} />
          </Modal>
          <Grid>
            <Button
              aria-label="add"
              variant="contained"
              onClick={() => setActiveModal('new-job')}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
}
