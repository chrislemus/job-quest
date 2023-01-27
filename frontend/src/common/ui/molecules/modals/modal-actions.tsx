import DialogActions from '@mui/material/DialogActions';
import { PropsWithChildren } from 'react';

export function ModalActions(p: PropsWithChildren<{}>) {
  return <DialogActions>{p.children}</DialogActions>;
}
