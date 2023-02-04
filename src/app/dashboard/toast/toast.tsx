import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@app/dashboard/store';
import { currentToastDone } from '@app/dashboard/toast/toast.slice';
import { Alert } from '@common/ui/atoms/alert';

export function Toast() {
  const dispatch = useAppDispatch();
  const toast = useAppSelector((state) => state.toast.currentToast);
  const [open, setOpen] = useState(false);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  // use effect logic below is to trigger close effect on Alert onCLose listener.
  // If there are two notifications, by default the second toast would remain open until manually closes it
  // `autoHideDuration` would not work
  useEffect(() => {
    if (!open) dispatch(currentToastDone());
  }, [open]);
  useEffect(() => {
    if (toast) setOpen(true);
  }, [toast]);

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={open && !!toast}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          elevation={6}
          variant="outlined"
          onClose={handleClose}
          severity={toast?.type}
          sx={{ width: '100%' }}
        >
          {toast?.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
