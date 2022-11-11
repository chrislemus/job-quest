'use client';
import { useProfile } from '@core/user/mutation-hooks';
import { useLogout } from '@core/auth/mutation-hooks';
import { Button } from '@common/ui/atoms/button';

export default function Dashboard() {
  const user = useProfile();
  const logoutStore = useLogout();

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
