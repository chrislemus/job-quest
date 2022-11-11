import { Modal, ModalContent, ModalTitle } from '@common/ui/molecules';
import { Button } from '@common/ui/atoms/button';
import { PropsWithoutRef } from 'react';

interface SignUpModalProps {
  active: boolean;
  toggleActive: () => void;
}

export function SignUpModal(p: PropsWithoutRef<SignUpModalProps>) {
  return (
    <Modal
      active={p.active}
      toggleActive={p.toggleActive}
      // title="Log In"
      // body={<p>LogIn</p>}
      // footer={
      //   <>
      //     <Button color="primary">Log In</Button>
      //     <Button onClick={p.toggleActive}>Cancel</Button>
      //   </>
      // }
    >
      <ModalTitle>Log In</ModalTitle>
      <ModalContent>
        <Button color="primary">Log In</Button>
        <Button onClick={p.toggleActive}>Cancel</Button>
      </ModalContent>
    </Modal>
  );
}
// export function SignUpModals(p: PropsWithoutRef<SignUpModalProps>) {
//   return (
//     <ModalCard
//       active={p.active}
//       toggleActive={p.toggleActive}
//       title="Log In"
//       body={<p>LogIn</p>}
//       footer={
//         <>
//           <Button color="primary">Log In</Button>
//           <Button onClick={p.toggleActive}>Cancel</Button>
//         </>
//       }
//     />
//   );
// }
