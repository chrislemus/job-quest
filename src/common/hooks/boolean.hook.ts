import { useState } from 'react';

type useBooleanReturnType = [
  boolean,
  {
    on: () => void;
    off: () => void;
    toggle: () => void;
  }
];

export function useBoolean(
  defaultValue: boolean = false
): useBooleanReturnType {
  const [state, setState] = useState<boolean>(defaultValue);

  const setter = {
    on: () => setState(true),
    off: () => setState(false),
    toggle: () => setState((s) => !s),
  };

  return [state, setter];
}
