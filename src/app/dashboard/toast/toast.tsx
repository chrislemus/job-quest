import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/dashboard/store';
import { dequeueToast, ToastType } from '@/app/dashboard/toast/toast.slice';
import * as _Toast from '@radix-ui/react-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleXmark,
  IconDefinition,
  faCircleCheck,
} from '@fortawesome/free-regular-svg-icons';
import {
  faInfo,
  faXmark,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';

const ToastIcon: Record<ToastType, IconDefinition> = {
  info: faInfo,
  success: faCircleCheck,
  warning: faExclamationTriangle,
  error: faCircleXmark,
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
        data-type={toastType}
        className="group alert shadow-lg data-[type=info]:alert-info data-[type=success]:alert-success data-[type=warning]:alert-warning data-[type=error]:alert-error"
      >
        <_Toast.Description>
          <FontAwesomeIcon
            data-type={toastType}
            className="h-6 aspect-square data-[type=info]:border-current data-[type=info]:border-2 data-[type=info]:rounded-full data-[type=info]:p-1 data-[type=info]:h-3"
            icon={Icon}
          />
          {toast?.message}
        </_Toast.Description>
        <_Toast.Close>
          <FontAwesomeIcon
            className="w-6 h-6 btn btn-ghost btn-xs btn-circle"
            icon={faXmark}
          />
        </_Toast.Close>
      </_Toast.Root>

      <_Toast.Viewport className="toast toast-start z-30" />
    </_Toast.Provider>
  );
}
