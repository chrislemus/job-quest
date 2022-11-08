import { clsx } from 'clsx';
import { PropsWithoutRef } from 'react';

interface TextFieldProps {
  name: string;
  type: 'text' | 'email' | 'password';
  label?: string;
  placeholder?: string;
  isInvalid?: boolean;
  isValid?: boolean;
  invalidMsg?: string;
  validMsg?: string;
}

export function TextField(p: PropsWithoutRef<TextFieldProps>) {
  return (
    <div className="field">
      {p.label && <label className="label">{p.label}</label>}
      <div className="control">
        <input
          className={clsx('input', {
            'is-danger': p.isInvalid,
            'is-success': p.isValid,
          })}
          type="pass"
          placeholder={p.placeholder}
        />
        {(p.invalidMsg || p.validMsg) && (
          <p
            className={clsx('help', {
              'is-danger': p.invalidMsg,
              'is-success': p.validMsg,
            })}
          >
            {p.invalidMsg || p.validMsg}
          </p>
        )}
      </div>
    </div>
  );
}
