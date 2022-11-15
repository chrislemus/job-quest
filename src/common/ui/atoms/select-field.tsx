import { Controller, useFormContext } from 'react-hook-form';
import { ReactNode, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

interface SelectFieldProps {
  name: string;
  label: string;
  options: { value: any; label: ReactNode }[];
  defaultValue?: any;
  variant?: 'outlined' | 'filled' | 'standard';
}

export function SelectField(p: SelectFieldProps) {
  const { control, setValue } = useFormContext(); // retrieve all hook methods
  const fieldId = `select-field-${p.name}`;
  const labelId = `${fieldId}-label`;

  useEffect(() => {
    if (p.defaultValue) {
      setValue(p.name, p.defaultValue);
    }
  }, []);

  return (
    <FormControl fullWidth variant={p.variant}>
      <InputLabel id={labelId}>{p.label}</InputLabel>
      <Controller
        control={control}
        name={p.name}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Select
            value={value || p.defaultValue}
            labelId={labelId}
            label={p.label}
            id={fieldId}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
          >
            {p.options?.map((o, idx) => {
              return (
                <MenuItem value={o.value} key={idx}>
                  {o.label}
                </MenuItem>
              );
            })}
          </Select>
        )}
      />
    </FormControl>
  );
}
