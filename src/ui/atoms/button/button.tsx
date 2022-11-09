import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

type ReactBtn = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

/** Button component props. */
export type ButtonProps = {
  disabled?: boolean;
  loading?: boolean;
  type: ReactBtn['type'];
  size?: 'small' | 'normal' | 'medium' | 'large';
  onClick?: ReactBtn['onClick'];
  color?: 'primary' | 'link' | 'info' | 'success' | 'warning' | 'danger';
  variant?: 'white' | 'light' | 'dark' | 'black' | 'text' | 'ghost';
  children?: React.ReactNode[] | React.ReactNode;
  customStyle?: ReactBtn['style'];
};

/** Default button props defined as const to extract specified value type. */
export const defaultButtonProps = {
  size: 'normal',
  type: 'button',
} as const;

/** Button component */
export function Button(_p: PropsWithChildren<ButtonProps>) {
  const p = _p as ButtonProps & typeof defaultButtonProps;

  const color = p.color ? `is-${p.color}` : '';
  const variant = p.variant ? `is-${p.variant}` : '';

  return (
    <button
      className={clsx('button', `is-${p.size} ${color} ${variant}`, {
        'is-loading': p.loading,
      })}
      type={p.type}
      onClick={p.onClick}
      style={p.customStyle}
      disabled={p.disabled || p.loading}
    >
      {p.children}
    </button>
  );
}

Button.defaultProps = defaultButtonProps;
