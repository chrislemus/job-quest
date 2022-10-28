import { useState } from 'react';

export function useMenuActiveClass() {
  const [menuActive, setMenuActive] = useState(false);
  const menuActiveClass = menuActive ? 'is-active' : '';
  const onMenuClick = () => setMenuActive((curr) => !curr);

  return { onMenuClick, menuActiveClass };
}
