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
  const form = useLoginForm();

  return (
    <form onSubmit={form.onSubmit}>
      <ModalCard
        active={p.active}
        toggleActive={p.toggleActive}
        title="Log In"
        body={
          <>
            <p>Welcome back! Enter your account info below to continue.</p>
            <br />
            <TextField
              type="email"
              label="Email"
              isInvalid={form.errors?.email?.message}
              {...form.register('email')}
            />

            <TextField
              type="password"
              label="Password"
              isInvalid={form.errors?.password?.message}
              {...form.register('password')}
            />
          </>
        }
        footer={
          <>
            <Button color="primary" type="submit">
              Log In
            </Button>
            <Button onClick={p.toggleActive}>Cancel</Button>
          </>
        }
      />
    </form>
  );
}
