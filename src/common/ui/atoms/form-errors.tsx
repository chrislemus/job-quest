import { useMemo } from 'react';
import { Typography } from './typography';

export function FormErrors(p: { errors?: string[] }) {
  const errors = useMemo(() => {
    return p.errors?.map((msg, idx) => {
      return <li key={idx}>{msg}</li>;
    });
  }, [p.errors]);

  return (
    <>
      {errors && (
        <Typography paddingTop={1} color="error" variant="body2">
          {errors}
        </Typography>
      )}
    </>
  );
}
