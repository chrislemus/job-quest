'use client';
import { Form } from '@common/ui/molecules';
import { UserLogin } from '@app/auth/_dto';
import { useLogin } from '@app/auth/_hooks';
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
  const login = useLogin();

  return (
    <Form
      id={formId}
      formMethods={form}
      onValidSubmit={(data) => {
        login.mutate(data);
      }}
    >
      <Stack spacing={3}>
        <Typography variant="h4" component="h1" style={{ fontWeight: 700 }}>
          Log In
        </Typography>
        <FormErrors errors={login?.error?.messages} />

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
          disabled={form.formState.isSubmitting || login.isLoading}
          loading={form.formState.isSubmitting || login.isLoading}
        >
          Log In
        </Button>
      </Stack>
    </Form>
  );
}
