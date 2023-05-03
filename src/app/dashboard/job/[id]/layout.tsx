'use client';

import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default function JobLayout(p: PropsWithChildren<{}>) {
  const router = useRouter();

  return (
    <div className="container mx-auto min-h-screen">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <button
            className="btn btn-primary btn-outline btn-sm"
            onClick={() => {
              router.back();
            }}
          >
            <ChevronLeftIcon className="w-6 h-6" />
            Back
          </button>
        </div>
        <div>{p.children}</div>
      </div>
    </div>
  );
}
