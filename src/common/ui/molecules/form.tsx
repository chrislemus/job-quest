import { Box } from '@common/ui/atoms';
import { PropsWithChildren } from 'react';
import { FormProvider } from 'react-hook-form';
import {
  FieldValue,
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';

export function Form<
  TFieldValues extends FieldValues = FieldValue<FieldValues>
>(
  p: PropsWithChildren<{
    id: string;
    formMethods: UseFormReturn<TFieldValues>;
    onValidSubmit: SubmitHandler<TFieldValues>;
    onInvalidSubmit?: SubmitErrorHandler<TFieldValues>;
    noValidate?: boolean;
    autoComplete?: 'on' | 'off';
  }>
) {
  return (
    <Box
      onSubmit={p.formMethods.handleSubmit(p.onValidSubmit, p.onInvalidSubmit)}
      component="form"
      id={p.id}
      noValidate={p.noValidate}
      autoComplete={p.autoComplete}
    >
      <FormProvider {...p.formMethods}>
        {p.children}
        {/* <DevTool control={p.formMethods.control} /> */}
      </FormProvider>
    </Box>
  );
}
