import _TextField, {
  TextFieldProps as _TextFieldProps,
} from '@mui/material/TextField';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

interface TextFieldProps {
  name: string;
  type?: 'text' | 'email' | 'password';
  helperText?: string;
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
  isInvalid?: boolean;
  onChange?: _TextFieldProps['onChange'];
  onBlur?: _TextFieldProps['onBlur'];
  variant?: 'standard' | 'filled' | 'outlined';
  multiline?: boolean;
  rows?: string | number;
  defaultValue?: string | number;
  valueAsNumber?: boolean;
  setValueAs?: (value: any) => any;
  endAdornment?: JSX.Element;
}

export function TextField(p: TextFieldProps) {
  const { register, getValues, setValue } = useFormContext(); // retrieve all hook methods
  const { name, onChange, onBlur, ref, required, disabled, ..._res } = register(
    p.name,
    { valueAsNumber: p.valueAsNumber, setValueAs: p.setValueAs }
  );

  useEffect(() => {
    if (!getValues(p.name) && p.defaultValue) {
      setValue(p.name, p.defaultValue);
    }
  }, []);

  return (
    <_TextField
      variant={p.variant}
      margin="dense"
      InputProps={{
        endAdornment: p.endAdornment,
      }}
      type={p.type}
      label={p.label}
      placeholder={p.placeholder}
      fullWidth={p.fullWidth || undefined}
      name={name}
      onChange={(...args) => {
        onChange(...args);
        p?.onChange && p?.onChange(...args);
      }}
      onBlur={(...args) => {
        onBlur(...args);
        p?.onBlur && p?.onBlur(...args);
      }}
      multiline={p.multiline}
      ref={ref}
      rows={p.rows}
      disabled={disabled}
      required={required}
      error={(p.isInvalid || undefined) as true | undefined}
      helperText={p.helperText}
    />
  );
}
