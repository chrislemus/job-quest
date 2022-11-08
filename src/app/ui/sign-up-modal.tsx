import { ModalCard } from '@src/ui/molecules';
import { Button } from '@src/ui/atoms/button';
import { PropsWithoutRef } from 'react';

interface SignUpModalProps {
  active: boolean;
  toggleActive: () => void;
}

export function SignUpModal(p: PropsWithoutRef<SignUpModalProps>) {
  return (
    <ModalCard
      active={p.active}
      toggleActive={p.toggleActive}
      title="Log In"
      body={<p>LogIn</p>}
      footer={
        <>
          <Button color="primary">Log In</Button>
          <Button onClick={p.toggleActive}>Cancel</Button>
        </>
      }
    />
  );
}
