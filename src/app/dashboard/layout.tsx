'use client';
import clsx from 'clsx';
import { RouterAuthGuard } from '@core/auth/ui';
import { PropsWithChildren, useState } from 'react';

export default function Layout(p: PropsWithChildren<{}>) {
  return (
    <RouterAuthGuard>
      <div className="has-background-white-bis">
        <NavBar />
        {p.children}
      </div>
    </RouterAuthGuard>
  );
}

function NavBar() {
  const [activeMenu, setActiveMenu] = useState(false);
  const toggleActiveMenu = () => setActiveMenu((s) => !s);

  return <div className="columns"></div>;
}
