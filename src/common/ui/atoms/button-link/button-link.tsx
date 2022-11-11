import React, { PropsWithChildren } from 'react';

/** Button component props. */
export type ButtonLinkProps = {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'normal' | 'medium' | 'large';
  color?:
    | 'primary'
    | 'link'
    | 'info'
    | 'success'
    | 'warning'
    | 'danger'
    | 'white'
    | 'light'
    | 'dark'
    | 'black'
    | 'text'
    | 'ghost';
  children?: React.ReactNode[] | React.ReactNode;
};

/** Default button props defined as const to extract specified value type. */
export const defaultButtonProps = {
  size: 'normal',
} as const;

/** Button component default props. */
type DefaultButtonLinkProps = typeof defaultButtonProps;

/** Button component */
export function ButtonLink(_p: PropsWithChildren<ButtonLinkProps>) {
  const p = _p as ButtonLinkProps & DefaultButtonLinkProps;

  const color = p.color ? `is-${p.color}` : '';

  return <a className={`button is-${p.size} ${color}`}>{p.children}</a>;
}

ButtonLink.defaultProps = defaultButtonProps;
