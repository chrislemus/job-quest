'use client';
import { RefObject, useEffect, useRef, useState } from 'react';
import { JobListPanel } from './_ui';
import { useJobListQuery } from './job-list/_query-hooks';
import { motion, useDragControls } from 'framer-motion';
import styles from './page.module.scss';
import scrollBarStyles from './job-list-scroll-bar.module.scss';

function JobListScrollBar(p: { panelRef: RefObject<HTMLDivElement> }) {
  const scrollBarDrag = useRef<HTMLDivElement>(null);
  const controls = useDragControls();

  return (
    <div className={scrollBarStyles.scrollBarContainer}>
      <motion.div
        drag="x"
        ref={scrollBarDrag}
        dragControls={controls}
        className={scrollBarStyles.scrollBarThumb}
        dragMomentum={false}
        dragTransition={{
          bounceStiffness: 1000,
          bounceDamping: 50,
        }}
        whileDrag={{ scaleY: 1.5 }}
        onDrag={(_e, info) => {
          const scrollEl = p.panelRef.current;
          if (scrollEl) {
            const scrollOffset = Math.floor(info.offset.x * 0.08);
            const newScroll = Math.floor(scrollEl.scrollLeft + scrollOffset);
            scrollEl.scroll({ left: newScroll });
          }
        }}
        dragConstraints={{ left: 0, right: 0 }}
      />
    </div>
  );
}

export default function Dashboard() {
  const [activeJobListId, setActiveJobListId] = useState<number>();
  const JobsListQuery = useJobListQuery();

  let panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data = JobsListQuery.data?.data;
    if (!activeJobListId && data) {
      const orderedJobList = data.sort((a, b) => a.order - b.order);
      const firstJobList = orderedJobList?.[0]?.id;
      // list should not be empty, but adding if condition to avoid errors
      if (firstJobList) setActiveJobListId(firstJobList);
    }
  }, [JobsListQuery.isSuccess]);

  // TODO: implement logic to only fetch if jobList is present
  // or leave optional, provided that all jobs will eventually be displayed.

  return (
    <>
      {activeJobListId && JobsListQuery.data?.data && (
        <>
          <div className={styles.panelContainer} ref={panelRef}>
            <JobListScrollBar panelRef={panelRef} />
            {JobsListQuery.data?.data.map((jobList, idx) => {
              return (
                <div key={jobList.id} className={styles.jobListColumn}>
                  <div className={styles.jobListColumnHeader}>
                    <h1>{jobList.label}</h1>
                  </div>
                  <div className={styles.jobListColumnListScroll}>
                    <JobListPanel
                      activeJobListId={jobList.id}
                      jobLists={JobsListQuery.data?.data || []}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
