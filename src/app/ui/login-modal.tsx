import { ModalCard } from '@src/ui/molecules';
import { Button } from '@src/ui/atoms/button';
import { PropsWithoutRef } from 'react';
import { LoginForm } from './login-form';

interface LoginModalProps {
  active: boolean;
  toggleActive: () => void;
}

export function LoginModal(p: PropsWithoutRef<LoginModalProps>) {
  return (
    <ModalCard
      active={p.active}
      toggleActive={p.toggleActive}
      title="Log In"
      body={<LoginForm />}
      footer={
        <>
          <Button color="primary">Log In</Button>
          <Button onClick={p.toggleActive}>Cancel</Button>
        </>
      }
    />
  );
}
