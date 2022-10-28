import { useState } from 'react';

export function useMenuActiveClass(): {
  /** Anonymous function that updates state when nav burger button is clicked. */
  onMenuClick: () => void;
  /** Class name that should be applied to button element. */
  menuActiveClass: string;
} {
  const [menuActive, setMenuActive] = useState(false);
  const menuActiveClass = menuActive ? 'is-active' : '';
  const onMenuClick = () => setMenuActive((curr) => !curr);

  return { onMenuClick, menuActiveClass };
}
