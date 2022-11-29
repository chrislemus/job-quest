'use client';
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@common/ui/atoms';
import { Form } from '@common/ui/molecules';
import { UserLogin } from '@core/auth/dto';
import { useLogin } from '@core/auth/mutation-hooks';
import { useForm } from 'react-hook-form';
import { formValidator } from '@common/utils';
import { theme } from '@common/theme';
import { HistoryEduIcon } from '@common/ui/icons';
// import {theme}

export default function Login() {
  const formId = 'login';
  const form = useForm<UserLogin>({
    resolver: formValidator(UserLogin),
  });
  const a = theme;

  const loginMutation = useLogin();

  let errorMsg: string | undefined;
  const errorStatus = loginMutation?.error?.response?.status;

  if (errorStatus) {
    if (errorStatus === 401) {
      errorMsg = 'Invalid credentials, please try again';
    } else {
      errorMsg = 'server error, unable to login';
    }
  }

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

      {errorMsg && (
        <Typography paddingTop={1} color="error">
          {errorMsg}
        </Typography>
      )}
      <br />

      <Stack spacing={3}>
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
