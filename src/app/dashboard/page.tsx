'use client';
import { authService } from '@root/src/services';
import { userService } from '@root/src/services/user.service';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState('second');
  useEffect(() => {
    // const user = authService.getCurrentUser();
    userService.getProfile().then((user) => setUser(JSON.stringify(user)));
  }, []);
  return (
    <>
      <main>
        <h1>hi</h1>
        {user}
      </main>
    </>
  );
}
