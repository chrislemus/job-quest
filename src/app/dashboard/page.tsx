'use client';
import { storeAsync } from '@src/storeAsync';
import { useUserCtx } from '@src/features/user';
import { Button } from '@src/ui/atoms/button';

export default function Dashboard() {
  const user = storeAsync.user.profile();

  const logoutStore = storeAsync.auth.logout();

  return (
    <>
      <main>
        <h1>hi</h1>
        <p>{JSON.stringify(user.data)}</p>
        <Button
          onClick={() => logoutStore.mutate()}
          loading={logoutStore.isLoading}
        >
          Log Out
        </Button>
      </main>
    </>
  );
}
