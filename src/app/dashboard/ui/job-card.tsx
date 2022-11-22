import { JobEntity, JobListEntity } from '@core/job/entities';
import { PropsWithoutRef, useMemo, useState } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@common/ui/atoms';
import { queryClient, theme } from '@app/layout';
import Link from 'next/link';
import { MoveUpIcon } from '@common/ui/icons';
import { useMutation } from '@tanstack/react-query';
import { jobService } from '@core/job/services';
import { ApiOkRes } from '@core/http/job-quest/interface';

interface JobCardProps {
  job: JobEntity;
  jobLists: JobListEntity[];
}

export function JobCard(p: PropsWithoutRef<JobCardProps>) {
  const backgroundColor = p.job.color || '#ffff';
  const textColor = useMemo(() => {
    return theme.palette.getContrastText(backgroundColor);
  }, [backgroundColor]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const editJobMutation = useMutation({
    mutationFn: (jobListId: number) => {
      return jobService.updateJob(p.job.id, { jobListId });
    },

    onSuccess(_data: ApiOkRes<JobEntity>) {
      queryClient.invalidateQueries({
        queryKey: ['job', p.job.id],
      });
      queryClient.invalidateQueries({
        queryKey: ['jobs', { jobListId: p.job.jobListId }],
      });
    },
  });

  return (
    <Card sx={{ minWidth: 275 }} style={{ backgroundColor }}>
      <CardActionArea href={`/dashboard/job/${p.job.id}`} component={Link}>
        <CardContent>
          <Typography variant="button" noWrap display="block" color={textColor}>
            <strong>{p.job.title}</strong>
          </Typography>
          <Typography sx={{ mb: 1.5 }} color={textColor}>
            {p.job.company}
          </Typography>
        </CardContent>
      </CardActionArea>
      <IconButton onClick={handleClick}>
        <MoveUpIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {editJobMutation.isLoading ? (
          <MenuItem>Loading...</MenuItem>
        ) : (
          <>
            {p.jobLists.map((list) => {
              return (
                <MenuItem
                  key={list.id}
                  disabled={p.job.jobListId === list.id}
                  onClick={async () => {
                    await editJobMutation.mutateAsync(list.id);
                    handleClose();
                  }}
                >
                  {list.label}
                </MenuItem>
              );
            })}
          </>
        )}
      </Menu>
    </Card>
  );
}
