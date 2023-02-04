import { useUpdateJob } from '@app/dashboard/job/hooks';
import { JobEntity } from '@api/job-quest/job/job.entity';
import { JobListEntity } from '@api/job-quest/job-list/job-list.entity';
import Link from 'next/link';
import { MoveUpIcon } from '@common/ui/icons';
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

type JobCardProps = {
  job: JobEntity;
  jobLists: JobListEntity[];
};

export function JobCard(p: PropsWithoutRef<JobCardProps>) {
  const editJobMutation = useUpdateJob();
  const backgroundColor = p.job.color || '#ffff';
  const textColor = useMemo(() => {
    return theme.palette.getContrastText(backgroundColor);
  }, [backgroundColor]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

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
      <IconButton
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
        }}
      >
        <MoveUpIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
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
                onClick={() => {
                  editJobMutation.mutate(
                    {
                      jobId: p.job.id,
                      data: { jobListId: list.id },
                    },
                    {
                      onSuccess: () => {
                        handleClose();
                      },
                    }
                  );
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
