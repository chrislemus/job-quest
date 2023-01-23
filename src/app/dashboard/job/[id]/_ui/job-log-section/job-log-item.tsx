import { JobLogEntity } from '@app/dashboard/job-log/_entities';
import { useDeleteJobLog } from '@app/dashboard/job-log/_hooks';
import { useMemo, useState } from 'react';
import { useBoolean } from '@common/hooks';
import { MoreHorizIcon } from '@common/ui/icons';
import { UpdateJobLogForm } from './update-job-log-form';
import {
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@common/ui/atoms';

function useActionMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const close = () => setAnchorEl(null);
  const open = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  function onSelect(action: () => void) {
    return () => {
      action();
      close();
    };
  }

  return { anchorEl, isOpen, open, close, onSelect };
}

interface JobLogItemProps {
  jobLog: JobLogEntity;
}

export function JobLogItem(p: JobLogItemProps) {
  const updatedDate = useMemo(
    () => new Date(p.jobLog.updatedAt).toLocaleDateString(),
    [p.jobLog.updatedAt]
  );

  const deleteJobLogMutation = useDeleteJobLog();
  const deleteJobLog = () => deleteJobLogMutation.mutate(p.jobLog.id);

  const [displayForm, setDisplayForm] = useBoolean();
  const actionMenu = useActionMenu();

  return (
    <Box>
      <Grid container paddingY={0}>
        <Grid flexGrow={1} paddingBottom={0}>
          <Typography variant="subtitle2" color="GrayText">
            {updatedDate}
          </Typography>
        </Grid>
        <Grid paddingBottom={0}>
          <IconButton
            size="small"
            aria-haspopup="true"
            disabled={!!displayForm}
            onClick={actionMenu.open}
          >
            <MoreHorizIcon />
          </IconButton>
          <Menu
            anchorEl={actionMenu.anchorEl}
            open={actionMenu.isOpen}
            onClose={actionMenu.close}
          >
            <MenuItem onClick={actionMenu.onSelect(setDisplayForm.on)}>
              edit
            </MenuItem>
            <MenuItem onClick={actionMenu.onSelect(deleteJobLog)}>
              delete
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
      {displayForm ? (
        <UpdateJobLogForm jobLog={p.jobLog} disableForm={setDisplayForm.off} />
      ) : (
        <Typography
          variant="body1"
          sx={{ wordWrap: 'break-word', whiteSpace: 'pre-line' }}
        >
          {p.jobLog.content}
        </Typography>
      )}
    </Box>
  );
}
