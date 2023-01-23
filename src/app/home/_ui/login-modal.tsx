'use client';
import { PropsWithoutRef } from 'react';
import { TextField, Button, FormErrors } from '@common/ui/atoms';
import { RouterAuthGuard } from '@app/auth/_ui';
import { useForm } from 'react-hook-form';
import { formValidator } from '@common/utils';
import { useLogin } from '@app/auth/_hooks';
import { UserLogin } from '@app/auth/_dto';
import {
  Form,
  Modal,
  ModalActions,
  ModalContent,
  ModalContentText,
  ModalTitle,
} from '@common/ui/molecules';

type LoginModalProps = {
  active: boolean;
  toggleActive: () => void;
};

export function LoginModal(p: PropsWithoutRef<LoginModalProps>) {
  const formId = 'login';
  const form = useForm<UserLogin>({
    resolver: formValidator(UserLogin),
  });

  const loginMutation = useLogin();

  return (
    <RouterAuthGuard>
      <Form
        id={formId}
        formMethods={form}
        onValidSubmit={(data) => {
          loginMutation.mutate(data);
        }}
      >
        <Modal active={p.active} toggleActive={p.toggleActive}>
          <ModalTitle>Log In</ModalTitle>
          <ModalContent>
            <ModalContentText>
              Welcome back! Enter your account info below to continue.
            </ModalContentText>

            <FormErrors errors={loginMutation?.error?.messages} />
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
              form={formId}
              disabled={form.formState.isSubmitting || loginMutation.isLoading}
              loading={form.formState.isSubmitting || loginMutation.isLoading}
            >
              Log In
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
