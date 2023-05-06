'use client';
import { useModal } from '@/common/hooks';
import { JobListTabContent, JobListTabs, AddJobModal, MODAL_ID } from './ui';

export default function JobListPage() {
  const modal = useModal(MODAL_ID);

  return (
    <div className="flex flex-col gap-3">
      {/* Top Nav */}
      <div className="flex justify-end">
        <button className="btn btn-primary" onClick={() => modal.toggle()}>
          Add
        </button>
      </div>
      <div>
        <JobListTabs />
      </div>
      <div className="pt-3">
        <JobListTabContent />
      </div>
      <AddJobModal />
    </div>
  );
}
