import DialogTitle from '@mui/material/DialogTitle';
import { PropsWithChildren } from 'react';

export function ModalTitle(p: PropsWithChildren<{}>) {
  return <DialogTitle>{p.children}</DialogTitle>;
}
