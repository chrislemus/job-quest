import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export function useModal(modalId: string) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);
  const activeModals = params.getAll('modal');
  const isOpen = useMemo(() => activeModals.includes(modalId), [searchParams]);

  const toggle = useCallback(() => {
    if (isOpen) {
      params.delete('modal');
      for (const id of activeModals) {
        if (id !== modalId) params.append('modal', id);
      }
    } else {
      params.append('modal', modalId);
    }

    const queryString = params.toString();
    router.replace(`${pathname}?${queryString}`);
  }, [searchParams]);

  return { toggle, isOpen };
}
