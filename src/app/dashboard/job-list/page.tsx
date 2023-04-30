'use client';
import { Grid } from '@common/ui/atoms';
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
      <div>
        <JobListTabContent />
      </div>
    </div>
  );
}
