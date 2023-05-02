'use client';
import { useModal } from '@/common/hooks';
import { JobListTabContent, JobListTabs, AddJobModal, MODAL_ID } from './ui';

export default function JobListPage() {
  const modal = useModal(MODAL_ID);
  const toggleAddJobModal = () => modal.toggle();

  return (
    <div className="flex flex-col gap-3">
      {/* Top Nav */}
      <div className="flex justify-end">
        <button className="btn btn-primary" onClick={toggleAddJobModal}>
          Add
        </button>
      </div>
      <div>
        <JobListTabs />
      </div>
      <div className="pt-3">
        <JobListTabContent toggleAddJobModal={toggleAddJobModal} />
      </div>
      <AddJobModal modalId={MODAL_ID} />
    </div>
  );
}
