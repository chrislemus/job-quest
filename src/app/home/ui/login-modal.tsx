'use client';
import {
  Modal,
  ModalActions,
  ModalContent,
  ModalContentText,
  ModalTitle,
} from '@common/ui/molecules';
import { Button } from '@common/ui/atoms/button';
import { PropsWithoutRef } from 'react';
import { TextField } from '@common/ui/atoms/text-field';
import { RouterAuthGuard } from '@core/auth/ui';
import { FormProvider, useForm } from 'react-hook-form';
import { formValidator } from '@common/utils';
import { User } from '@app/home/dto';
import { useLogin } from '@core/auth/mutation-hooks';

interface LoginModalProps {
  active: boolean;
  toggleActive: () => void;
}

export function LoginModal(p: PropsWithoutRef<LoginModalProps>) {
  const form = useForm<User>({
    defaultValues: {
      email: 'me5@me.com',
      password: 'hello123',
    },
    resolver: formValidator(User),
  });

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
  const onFormSubmit = () =>
    form.handleSubmit(async (data: User) => {
      await loginMutation.mutate(data);
    });

  return (
    <RouterAuthGuard>
      <FormProvider {...form}>
        <form onSubmit={onFormSubmit()} id="login">
          <Modal active={p.active} toggleActive={p.toggleActive}>
            <ModalTitle>Log In</ModalTitle>
            <ModalContent>
              <ModalContentText>
                Welcome back! Enter your account info below to continue.
              </ModalContentText>

              {errorMsg && <ModalContentText>{errorMsg}</ModalContentText>}
              <br />
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
                form="login"
                disabled={
                  form.formState.isSubmitting ||
                  form.formState.isSubmitSuccessful
                }
                loading={form.formState.isSubmitting}
              >
                Log In
              </Button>
              <Button onClick={p.toggleActive} type="button">
                Cancel
              </Button>
            </ModalActions>
          </Modal>
        </form>
      </FormProvider>
    </RouterAuthGuard>
  );
}
