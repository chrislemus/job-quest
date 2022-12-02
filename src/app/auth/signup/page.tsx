'use client';
import { useForm } from 'react-hook-form';
import { formValidator } from '@common/utils';
import { useSignUp } from '@app/auth/_hooks';
import { Form } from '@common/ui/molecules';
import { UserSignUp } from '@app/auth/_dto';
import {
  TextField,
  Button,
  Typography,
  Stack,
  FormErrors,
} from '@common/ui/atoms';

export default function SignUp() {
  const formId = 'signup';
  const form = useForm<UserSignUp>({
    resolver: formValidator(UserSignUp),
  });

  const signUpMutation = useSignUp();

  return (
    <Form
      id={formId}
      formMethods={form}
      onValidSubmit={async (data) => {
        await signUpMutation.mutate(data);
      }}
    >
      <Stack spacing={3}>
        <Typography variant="h4" component="h1" style={{ fontWeight: 700 }}>
          Sign Up
        </Typography>
        <FormErrors errors={signUpMutation?.error?.messages} />
        <TextField
          name="firstName"
          type="text"
          label="First Name"
          fullWidth
          isInvalid={!!form.formState.errors?.firstName?.message}
          helperText={form.formState.errors?.firstName?.message}
        />
        <TextField
          name="lastName"
          type="text"
          label="Last Name"
          fullWidth
          isInvalid={!!form.formState.errors?.lastName?.message}
          helperText={form.formState.errors?.lastName?.message}
        />
        <TextField
          name="email"
          type="email"
          label="Email"
          fullWidth
          isInvalid={!!form.formState.errors?.email?.message}
          helperText={form.formState.errors?.email?.message}
        />

        <TextField
          name="password"
          type="password"
          label="Password"
          fullWidth
          isInvalid={!!form.formState.errors?.password?.message}
          helperText={form.formState.errors?.password?.message}
        />
        <Button
          color="primary"
          type="submit"
          variant="contained"
          form={formId}
          disabled={form.formState.isSubmitting || signUpMutation.isLoading}
          loading={form.formState.isSubmitting || signUpMutation.isLoading}
        >
          Sign Up
        </Button>
      </Stack>
    </Form>
  );
}
