import { useBoolean } from '@common/hooks';
import { AddJobModal } from './add-job-modal';

export function JobListTopMenu() {
  const [activeModal, setActiveModal] = useBoolean();

  return (
    <div className="flex justify-end">
      <button
        aria-label="add-job"
        className="btn btn-primary"
        onClick={setActiveModal.toggle}
      >
        Add
      </button>
      <AddJobModal active={activeModal} toggleActive={setActiveModal.toggle} />
    </div>
  );
}
