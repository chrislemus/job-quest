'use client';
import { JobListTopMenu, JobListTabContent, JobListTabs } from './ui';

export default function JobListPage() {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <JobListTopMenu />
      </div>
      <div>
        <JobListTabs />
      </div>
      <div className="pt-3">
        <JobListTabContent />
      </div>
    </div>
  );
}
