import { ReactNode } from 'react';
import { ModalContainer } from './modal-container.component';

export const ModalCard: React.FC<{
  active: boolean;
  toggleActive: () => void;
  title: string;
  body: ReactNode;
  footer: ReactNode;
}> = (p) => {
  return (
    <ModalContainer active={p.active} toggleActive={p.toggleActive}>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{p.title}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={p.toggleActive}
          />
        </header>
        <section className="modal-card-body">{p.body}</section>
        <footer className="modal-card-foot">{p.footer}</footer>
      </div>
    </ModalContainer>
  );
};
