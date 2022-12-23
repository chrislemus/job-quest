import { JobEntity } from '@app/dashboard/job/_entities';
import { JobListEntity } from '@app/dashboard/job-list/_entities';
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
import { useUpdateJob } from '@app/dashboard/job/_hooks';

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

  const editJobMutation = useUpdateJob();

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
