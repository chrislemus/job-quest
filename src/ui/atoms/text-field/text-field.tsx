import { clsx } from 'clsx';
import React, { DOMAttributes } from 'react';

interface TextFieldProps {
  name: string;
  type: 'text' | 'email' | 'password';
  label?: string;
  placeholder?: string;
  isInvalid?: boolean | string;
  isValid?: boolean | string;
  onBlur?: DOMAttributes<HTMLInputElement>['onBlur'];
  onChange?: DOMAttributes<HTMLInputElement>['onChange'];
}

export const TextField = React.forwardRef<any, TextFieldProps>(
  function TextField(p: TextFieldProps, ref) {
    const hasInvalidMsg = typeof p.isInvalid === 'string';
    const hasValidMsg = typeof p.isValid === 'string';

    return (
      <div className="field">
        {p.label && <label className="label">{p.label}</label>}
        <div className="control">
          <input
            className={clsx('input', {
              'is-danger': !!p.isInvalid,
              'is-success': !!p.isValid,
            })}
            name={p.name}
            type={p.type}
            placeholder={p.placeholder}
            onBlur={p.onBlur}
            onChange={p.onChange}
            ref={ref}
          />
          {(hasInvalidMsg || hasValidMsg) && (
            <p
              className={clsx('help', {
                'is-danger': hasInvalidMsg,
                'is-success': hasValidMsg,
              })}
            >
              {p.isInvalid || p.isValid}
            </p>
          )}
        </div>
      </div>
    );
  }
);
