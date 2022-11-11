import { PropsWithChildren } from 'react';
import Dialog from '@mui/material/Dialog';

export const Modal = (
  p: PropsWithChildren<{ active: boolean; toggleActive: () => void }>
) => {
  return (
    <Dialog open={p.active} onClose={p.toggleActive}>
      {p.children}
    </Dialog>
  );
};
