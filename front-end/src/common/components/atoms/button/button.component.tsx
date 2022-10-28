import React from 'react';
import { defaultButtonProps } from './consts';
import { ButtonProps, DefaultButtonProps } from './types';

/** Button component */
export const Button: React.FC<ButtonProps> = (_p) => {
  const p = _p as ButtonProps & DefaultButtonProps;

  const Element = React.createElement(
    p.element,
    {
      className: `button is-${p.size} is-${p.color}`,
      type: p.element,
    },
    [...((p?.children || []) as any)]
  );

  return Element;
};

Button.defaultProps = defaultButtonProps;
