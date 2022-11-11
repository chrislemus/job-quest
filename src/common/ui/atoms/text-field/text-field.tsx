import _TextField from '@mui/material/TextField';
import React, { ChangeEventHandler, FocusEventHandler } from 'react';
import {
  Control,
  Controller,
  FieldValues,
  useFormContext,
} from 'react-hook-form';

interface TextFieldProps {
  name: string;
  type: 'text' | 'email' | 'password';
  helperText?: string;
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
  isInvalid?: boolean;
}

// export const TextField = React.forwardRef<any, TextFieldProps>(
export function TextField(p: TextFieldProps) {
  const { register } = useFormContext(); // retrieve all hook methods
  const { name, onChange, onBlur, ref, required, disabled, ..._res } = register(
    p.name
  );

  return (
    <_TextField
      error={(p.isInvalid || undefined) as true | undefined}
      margin="dense"
      type={p.type}
      label={p.label}
      placeholder={p.placeholder}
      fullWidth={p.fullWidth || undefined}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      ref={ref}
      disabled={disabled}
      required={required}
      helperText={p.helperText}
    />
  );
}
