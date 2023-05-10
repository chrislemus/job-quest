'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';
export default function JobLayout(p: PropsWithChildren<{}>) {
  const router = useRouter();

  return (
    <div className="container mx-auto min-h-screen px-4">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <button
            className="btn btn-primary btn-outline btn-sm"
            onClick={() => {
              router.back();
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
            Back
          </button>
        </div>
        <div>{p.children}</div>
      </div>
    </div>
  );
}
