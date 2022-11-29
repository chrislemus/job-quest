'use client';
import { PropsWithoutRef } from 'react';
import { TextField, Button, Typography } from '@common/ui/atoms';
import { RouterAuthGuard } from '@core/auth/ui';
import { useForm } from 'react-hook-form';
import { formValidator } from '@common/utils';
import { useSignUp } from '@core/auth/mutation-hooks';
import {
  Form,
  Modal,
  ModalActions,
  ModalContent,
  ModalContentText,
  ModalTitle,
} from '@common/ui/molecules';
import { UserSignUp } from '@core/auth/dto';

interface LoginModalProps {
  active: boolean;
  toggleActive: () => void;
}

export function SignUpModal(p: PropsWithoutRef<LoginModalProps>) {
  const formId = 'signup';
  const form = useForm<UserSignUp>({
    resolver: formValidator(UserSignUp),
  });

  const signUpMutation = useSignUp();

  let errorMsg: string | undefined;
  const errorResponseData = signUpMutation?.error?.response?.data as any;
  const errorStatus = errorResponseData?.statusCode;
  const errorResMessages = errorResponseData?.message;

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
    <RouterAuthGuard>
      <Form
        id={formId}
        formMethods={form}
        onValidSubmit={async (data) => {
          await signUpMutation.mutate(data);
        }}
      >
        <Modal active={p.active} toggleActive={p.toggleActive}>
          <ModalTitle>Sign Up</ModalTitle>
          <ModalContent>
            <ModalContentText>
              Welcome, please enter info below to continue.
            </ModalContentText>

            {errorMsg && (
              <Typography paddingTop={1} color="error">
                {errorMsg}
              </Typography>
            )}
            <br />

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
          </ModalContent>
          <ModalActions>
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
            <Button onClick={p.toggleActive} type="button">
              Cancel
            </Button>
          </ModalActions>
        </Modal>
      </Form>
    </RouterAuthGuard>
  );
}
