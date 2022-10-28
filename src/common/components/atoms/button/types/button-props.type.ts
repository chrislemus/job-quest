import { defaultButtonProps } from '@app/common/components/atoms/button/consts';

/** Button component props. */
export type ButtonProps = {
  variant?: 'primary' | 'secondary';
  element?: 'button' | 'a';
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

/** Button component default props. */
export type DefaultButtonProps = typeof defaultButtonProps;
