'use client';
import { useAuthCtx } from '@src/features/auth';
import { useUserCtx } from '@src/features/user';
import { Button } from '@src/ui/atoms/button';

export default function Dashboard() {
  const userCtx = useUserCtx();
  const authCtx = useAuthCtx();

  return (
    <>
      <main>
        <h1>hi</h1>
        <p>{JSON.stringify(userCtx.profile.data)}</p>
        <Button onClick={authCtx.logout}>Log Out</Button>
      </main>
    </>
  );
}
