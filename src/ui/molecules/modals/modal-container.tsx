import { PropsWithChildren } from 'react';
import { clsx } from 'clsx';

export const ModalContainer = (
  p: PropsWithChildren<{ active: boolean; toggleActive: () => void }>
) => {
  return (
    <div className={clsx('modal', { 'is-active': p.active })}>
      <div className="modal-background" onClick={p.toggleActive} />
      {p.children}
    </div>
  );
};
