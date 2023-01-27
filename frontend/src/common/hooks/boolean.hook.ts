import { useState } from 'react';

type useBooleanReturnType = [
  boolean,
  {
    on: () => void;
    off: () => void;
    toggle: () => void;
  }
];

export function useBoolean(): useBooleanReturnType {
  const [state, setState] = useState<boolean>(false);

  const setter = {
    on: () => setState(true),
    off: () => setState(false),
    toggle: () => setState((s) => !s),
  };

  return [state, setter];
}
