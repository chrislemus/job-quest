'use client';
import { Form } from '@common/ui/molecules';
import { UserLogin } from '@core/auth/dto';
import { useLogin } from '@core/auth/mutation-hooks';
import { useForm } from 'react-hook-form';
import { formValidator } from '@common/utils';
import {
  Button,
  FormErrors,
  Stack,
  TextField,
  Typography,
} from '@common/ui/atoms';

export default function Login() {
  const formId = 'login';
  const form = useForm<UserLogin>({ resolver: formValidator(UserLogin) });
  const loginMutation = useLogin();

  return (
    <Form
      id={formId}
      formMethods={form}
      onValidSubmit={(data) => {
        loginMutation.mutate(data);
      }}
    >
      <Typography variant="h4" component="h1" style={{ fontWeight: 700 }}>
        Log In
      </Typography>

      <Stack spacing={3}>
        <FormErrors errors={loginMutation?.error?.messages} />

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
          disabled={form.formState.isSubmitting || loginMutation.isLoading}
          loading={form.formState.isSubmitting || loginMutation.isLoading}
        >
          Log In
        </Button>
      </Stack>
    </Form>
  );
}
