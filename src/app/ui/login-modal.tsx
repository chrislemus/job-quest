import { ModalCard } from '@src/ui/molecules';
import { Button } from '@src/ui/atoms/button';
import { PropsWithoutRef } from 'react';
import { TextField } from '@src/ui/atoms/text-field';
import { useLoginForm } from '@app/hooks';

interface LoginModalProps {
  active: boolean;
  toggleActive: () => void;
}

export function LoginModal(p: PropsWithoutRef<LoginModalProps>) {
  const { form, server } = useLoginForm();
  const { errors, isSubmitting } = form.formState;
  const serverErrorMsg = server.errorMsg;

  return (
    <form onSubmit={form.onSubmit}>
      <ModalCard
        active={p.active}
        toggleActive={p.toggleActive}
        title="Log In"
        body={
          <>
            <p>Welcome back! Enter your account info below to continue.</p>
            {serverErrorMsg && (
              <p className="help is-danger">{serverErrorMsg}</p>
            )}
            <br />
            <TextField
              type="email"
              label="Email"
              isInvalid={errors?.email?.message}
              {...form.register('email')}
            />

            <TextField
              type="password"
              label="Password"
              isInvalid={errors?.password?.message}
              {...form.register('password')}
            />
          </>
        }
        footer={
          <>
            <Button color="primary" type="submit" loading={isSubmitting}>
              Log In
            </Button>
            <Button onClick={p.toggleActive}>Cancel</Button>
          </>
        }
      />
    </form>
  );
}
