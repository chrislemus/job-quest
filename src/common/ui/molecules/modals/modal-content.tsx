import DialogContent from '@mui/material/DialogContent';
import { PropsWithChildren } from 'react';

export function ModalContent(p: PropsWithChildren<{}>) {
  return <DialogContent>{p.children}</DialogContent>;
}
