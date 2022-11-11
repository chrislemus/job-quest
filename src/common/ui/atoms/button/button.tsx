import LoadingButton from '@mui/lab/LoadingButton';

// type ReactBtn = React.DetailedHTMLProps<
//   React.ButtonHTMLAttributes<HTMLButtonElement>,
//   HTMLButtonElement
// >;

/** Button component props. */
// export type ButtonProps = {
//   color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
//   loading?: boolean;
//   type?: 'button' | 'reset' | 'submit';
//   onClick?: React.MouseEventHandler<HTMLButtonElement>;
//   disabled?: boolean;
//   fullWidth?: boolean;
//   size?: 'small' | 'medium' | 'large';
//   variant?: 'text' | 'outlined' | 'contained';
//   children?: React.ReactNode[] | React.ReactNode;
//   customStyle?: ReactBtn['style'];
// };

/** Button component */
// export function Button(p: PropsWithChildren<ButtonProps>) {
//   const dynamicProps = {
//     loading: (p.loading || undefined) as true | undefined,
//   };
//   const isDisabled = p.disabled || p.loading;
//   return (
//     <Btn
//       {...dynamicProps}
//       color={p.color}
//       type={p.type}
//       onClick={(e) => {
//         if (!isDisabled && p.onClick) {
//           p?.onClick(e);
//         }
//       }}
//       style={p.customStyle}
//       disabled={isDisabled}
//       fullWidth={p.fullWidth}
//       size={p.size}
//       variant={p.variant}
//     >
//       {p.children}
//     </Btn>
//   );
// }

export const Button = LoadingButton;
