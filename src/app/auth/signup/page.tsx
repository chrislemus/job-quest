'use client';
import { TextField, Button, Typography, Stack } from '@common/ui/atoms';
import { useForm } from 'react-hook-form';
import { formValidator } from '@common/utils';
import { useSignUp } from '@core/auth/mutation-hooks';
import { Form } from '@common/ui/molecules';
import { UserSignUp } from '@core/auth/dto';

export default function SignUp() {
  const formId = 'signup';
  const form = useForm<UserSignUp>({
    resolver: formValidator(UserSignUp),
  });

  const signUpMutation = useSignUp();

  let errorMsg: string | undefined;
  const errorResponseData = signUpMutation?.error?.response?.data as any;
  const errorStatus = errorResponseData?.statusCode;
  const errorResMessages = errorResponseData?.message;

  // console.log(signUpMutation);
  if (errorStatus) {
    if (errorStatus === 400 && errorResMessages) {
      errorMsg = errorResMessages.join(', ');
    } else {
      errorMsg = 'server error, unable to login';
    }
  }

  // let errorMsg =
  //   signUpMutation?.error?.response &&
  //   JSON.stringify(signUpMutation?.error?.response?.data);

  return (
    <Form
      id={formId}
      formMethods={form}
      onValidSubmit={async (data) => {
        await signUpMutation.mutate(data);
      }}
    >
      <Typography variant="h4" component="h1" style={{ fontWeight: 700 }}>
        Sign Up
      </Typography>

      {!errorMsg && <Typography color="error">{errorMsg}dwed</Typography>}
      {/* <br /> */}

      <Stack spacing={3}>
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
