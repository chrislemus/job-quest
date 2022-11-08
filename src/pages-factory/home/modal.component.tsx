import { clsx } from 'clsx';

export const LoginModal: React.FC<{
  active: boolean;
  toggleActive: () => void;
}> = (p) => {
  return (
    <div className={clsx('modal', { 'is-active': p.active })}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Modal title</p>
          <button className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          <p>swsw</p>{' '}
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success">Log In</button>
          <button className="button" onClick={p.toggleActive}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};
