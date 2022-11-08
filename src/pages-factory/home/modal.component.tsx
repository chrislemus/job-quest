import { ModalCard } from '@app/common/components/molecules';
import { Button } from '@root/src/common/components/atoms/button';

export const LoginModal: React.FC<{
  active: boolean;
  toggleActive: () => void;
}> = (p) => {
  return (
    <ModalCard
      active={p.active}
      toggleActive={p.toggleActive}
      title="Modal Title"
      body={<p>swsw</p>}
      footer={
        <>
          <Button color="primary">Log In</Button>
          <Button onClick={p.toggleActive}>Cancel</Button>
        </>
      }
    />
  );
};
