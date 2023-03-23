/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export function FormComponent({
  defaultValues,
  children,
  validationMode = 'onBlur',
  reValidateMode = 'onChange',
  validationSchema,
  ...props
}) {
  const methods = useForm({
    mode: validationMode, // default onchange
    defaultValues,
    reValidateMode,
    resolver: zodResolver(validationSchema),
    ...props,
  });

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form className="tw-w-full tw-h-full" {...props}>
      <FormProvider {...methods}>{children}</FormProvider>
    </form>
  );
}

FormComponent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  defaultValues: PropTypes.object,
  children: PropTypes.node,
  validationMode: PropTypes.string,
  reValidateMode: PropTypes.string,
};

FormComponent.defaultProps = {
  defaultValues: {},
  children: null,
  validationMode: 'onBlur',
  reValidateMode: 'onChange',
};
