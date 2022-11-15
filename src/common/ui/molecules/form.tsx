'use client';
import { Box } from '@common/ui/atoms';
import React, { ButtonHTMLAttributes, useState } from 'react';
import { createRef, PropsWithChildren, useEffect, useMemo } from 'react';
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
  const formInnerRef = createRef<HTMLFormElement>();
  const onSubmit = useMemo(() => {
    return p.formMethods.handleSubmit(p.onValidSubmit, p.onInvalidSubmit);
  }, [p.onValidSubmit, p.onInvalidSubmit]);
  const [onCLickBtn, setonCLickBtn] = useState<null | string>(null);

  // console.log(p.children);
  // const test = () => {
  //   console.log('caught submit');
  // };
  // useEffect(() => {
  //   // const btns = document.querySelectorAll(`button[type=submit][form=${p.id}]`);
  //   // console.log(btns);

  //   // btns.forEach((btn) => {
  //   //   btn.addEventListener('click', test);
  //   //   // btn.addEventListener();
  //   // });
  //   // return () => {
  //   //   btns.forEach((btn) => {
  //   //     btn.removeEventListener('click', onSubmit);
  //   //   });
  //   // };
  //   // React.Children.toArray(p.children).map((x) => console.log(x.type.name));

  //   const formEl = formInnerRef?.current;
  //   // console.log(formEl);
  //   // const testFn = (e: HTMLFormElement, ev: MouseEvent) => {
  //   //   console.log(e?.target);
  //   //   console.log(ev?.target);
  //   // };
  //   if (formEl) {
  //     const btns =
  //       formEl.querySelectorAll<HTMLButtonElement>(`button[type=submit]`);
  //     // formEl.addEventListener('click', (e) => {
  //     //   console.log(e);
  //     // });
  //     // console.log(btns);
  //     btns.forEach((btn) => {
  //       console.log(btn.attributes?.form?.name);
  //       console.log(btn.form);
  //       if (!onCLickBtn) {
  //         // setonCLickBtn(JSON.stringify(btn.form));
  //         setonCLickBtn(btn.attributes?.form?.name);
  //       }
  //       // btn.onclick = onSubmit;
  //       // btn.addEventListener('click', (e) => {
  //       //   console.log(e);
  //       // });
  //       // btn.addEventListener();
  //     });
  //   }
  // }, []);
  const testHandlerSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    if (e) {
      // window.alert(JSON.stringify(e.type));
      e.preventDefault();
      onSubmit(e);
      // console.log(e);
    }
  };

  return (
    <Box
      // onSubmit={onSubmit}
      // // onSubmit=
      onSubmit={testHandlerSubmit}
      component="form"
      id={p.id}
      noValidate={p.noValidate}
      autoComplete={p.autoComplete}
      ref={formInnerRef}
    >
      <p>{onCLickBtn}</p>
      <FormProvider {...p.formMethods}>{p.children}</FormProvider>
    </Box>
  );
}
