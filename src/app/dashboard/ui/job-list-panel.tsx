import { Grid, Skeleton } from '@common/ui/atoms';
import { JobEntity } from '@core/job/entities';
import update from 'immutability-helper';
import { PropsWithChildren, PropsWithoutRef, useEffect, useMemo } from 'react';
import { useCallback, useState } from 'react';
import { JobCard } from './job-card';

// const style = { width: 400 };

// export interface Item {
//   id: number;
//   text: string;
// }

// export interface ContainerState {
//   cards: Item[];
// }

interface JobListPanelProps {
  jobs: JobEntity[];
  loading?: number;
}

export function JobListPanel(p: PropsWithoutRef<JobListPanelProps>) {
  const [jobs, setJobs] = useState(p.jobs);
  function GridItem(p: PropsWithChildren<{}>) {
    return (
      <Grid xs={12} sm={6} md={4} lg={3}>
        {p.children}
      </Grid>
    );
  }

  const loadingCards = useMemo(() => {
    return (
      p.loading &&
      Array.from({ length: p.loading }, (_v, i) => (
        <GridItem key={i}>
          <Skeleton variant="rectangular" height={150} />
        </GridItem>
      ))
    );
  }, [p.loading]);

  useEffect(() => {
    if (!p.loading && p.jobs?.length > 0 && jobs?.length < 1) {
      setJobs(p.jobs);
    }
  }, [p.loading]);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setJobs((prevCards: JobEntity[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as JobEntity],
        ],
      })
    );
  }, []);

  const renderCard = useCallback((job: JobEntity, index: number) => {
    return (
      <GridItem key={job.id}>
        <JobCard
          index={index}
          id={job.id}
          job={job}
          text={job.title}
          moveCard={moveCard}
        />
      </GridItem>
    );
  }, []);

  return (
    <Grid
      container
      rowSpacing={6}
      columnSpacing={3}
      justifyContent={{ xs: 'center', sm: 'flex-start' }}
      paddingTop={3}
    >
      {p.loading ? (
        <>{loadingCards}</>
      ) : (
        <>
          {jobs.map((job, i) => {
            return renderCard(job, i);
          })}
        </>
      )}
    </Grid>
  );
}

// import { Grid, Skeleton } from '@common/ui/atoms';
// import { JobEntity } from '@core/job/entities';
// import { PropsWithChildren, PropsWithoutRef, useMemo } from 'react';
// import { JobCard } from './job-card';

// interface JobListPanelProps {
//   jobs: JobEntity[];
//   loading?: number;
// }

// export function JobListPanel(p: PropsWithoutRef<JobListPanelProps>) {
//   function GridItem(p: PropsWithChildren<{}>) {
//     return (
//       <Grid xs={12} sm={6} md={4} lg={3}>
//         {p.children}
//       </Grid>
//     );
//   }

//   const loadingCards = useMemo(
//     () =>
//       p.loading &&
//       Array.from({ length: p.loading }, (_v, i) => (
//         <GridItem key={i}>
//           <Skeleton variant="rectangular" height={150} />
//         </GridItem>
//       )),
//     [p.loading]
//   );

// return (
//   <Grid
//     container
//     rowSpacing={6}
//     columnSpacing={3}
//     justifyContent={{ xs: 'center', sm: 'flex-start' }}
//     paddingTop={3}
//   >
//     {p.loading ? (
//       <>{loadingCards}</>
//     ) : (
//       p.jobs.map((job, idx) => {
//         return (
//           <GridItem key={idx}>

//             <JobCard job={job} key={idx + job.title + job.jobListId} />
//           </GridItem>
//         );
//       })
//     )}
//   </Grid>
// );
// }
