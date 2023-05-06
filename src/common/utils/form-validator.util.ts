import 'reflect-metadata';
import { FieldErrors } from 'react-hook-form';
import { toNestError, validateFieldsNatively } from '@hookform/resolvers';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { validate, validateSync, ValidationError } from 'class-validator';
import { FieldValues, ResolverOptions, ResolverResult } from 'react-hook-form';
import { ValidatorOptions } from 'class-validator';
import { ClassConstructor } from 'class-transformer';

export type Resolver = <T extends { [_: string]: any }>(
  schema: ClassConstructor<T>,
  schemaOptions?: ValidatorOptions,
  resolverOptions?: { mode?: 'async' | 'sync'; rawValues?: boolean }
) => <TFieldValues extends FieldValues, TContext>(
  values: TFieldValues,
  context: TContext | undefined,
  options: ResolverOptions<TFieldValues>
) => Promise<ResolverResult<TFieldValues>>;

const parseErrors = (
  errors: ValidationError[],
  validateAllFieldCriteria: boolean,
  parsedErrors: FieldErrors = {},
  path = ''
) => {
  return errors.reduce((acc, error) => {
    const _path = path ? `${path}.${error.property}` : error.property;

    if (error.constraints) {
      const key = Object.keys(error.constraints)[0];
      acc[_path] = {
        type: key,
        message: error.constraints[key],
      };

      if (validateAllFieldCriteria && acc[_path]) {
        Object.assign(acc[_path] as any, { types: error.constraints });
      }
    }

    if (error.children && error.children.length) {
      parseErrors(error.children, validateAllFieldCriteria, acc, _path);
    }

    return acc;
  }, parsedErrors);
};

export const formValidator: Resolver = (
  schema,
  schemaOptions = {},
  resolverOptions = {}
) => {
  return async (values, _, options) => {
    const user = plainToInstance(schema, values, {
      enableImplicitConversion: true,
    });

    const rawErrors = await (resolverOptions.mode === 'sync'
      ? validateSync
      : validate)(user, schemaOptions);

    if (rawErrors.length) {
      const parsedErrors = parseErrors(
        rawErrors,
        !options.shouldUseNativeValidation && options.criteriaMode === 'all'
      );

      return {
        values: {},
        errors: toNestError(parsedErrors, options),
      };
    }

    options.shouldUseNativeValidation && validateFieldsNatively({}, options);

    return { values: instanceToPlain(user), errors: {} };
  };
};
