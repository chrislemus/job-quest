import { JobEntity, JobListEntity } from '@app/dashboard/job/entities';
import Link from 'next/link';
import { MoveUpIcon } from '@common/ui/icons';
import { useMutation } from '@tanstack/react-query';
import { jobService } from '@app/dashboard/job/services';
import { ApiOkRes } from '@common/api/job-quest/interface';
import { queryClient } from '@common/query-client';
import { theme } from '@common/theme';
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
          p.jobLists.map((list) => {
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
          })
        )}
      </Menu>
    </Card>
  );
}
