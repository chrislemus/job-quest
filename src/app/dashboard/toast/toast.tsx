import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@app/dashboard/store';
import { dequeueToast, ToastType } from '@app/dashboard/toast/toast.slice';
import * as _Toast from '@radix-ui/react-toast';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import cn from 'classnames';

type Icon = typeof InformationCircleIcon;
const ToastIcon: Record<ToastType, Icon> = {
  info: InformationCircleIcon,
  success: CheckCircleIcon,
  warning: ExclamationCircleIcon,
  error: XCircleIcon,
};

export function Toast() {
  const dispatch = useAppDispatch();
  const toast = useAppSelector((state) => state.toast.currentToast);
  const [open, setOpen] = useState(false);
  const toastType = toast?.type ?? 'info';
  const Icon = ToastIcon[toastType];

  useEffect(() => {
    if (toast && !open) setOpen(true);
  }, [toast, open]);

  return (
    <_Toast.Provider>
      <_Toast.Root
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) dispatch(dequeueToast());
        }}
        className={cn('alert shadow-lg', {
          'alert-success': toastType === 'success',
          'alert-info': toastType === 'info',
          'alert-warning': toastType === 'warning',
          'alert-error': toastType === 'error',
        })}
      >
        <_Toast.Description>
          <Icon className="w-6 h-6 " />
          {toast?.message}
        </_Toast.Description>
        <_Toast.Close>
          <XMarkIcon className="w-6 h-6" />
        </_Toast.Close>
      </_Toast.Root>

      <_Toast.Viewport className="toast toast-start z-30" />
    </_Toast.Provider>
  );
}
