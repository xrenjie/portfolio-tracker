import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function errorspan({ name }) {
  const {
    formState: { errors },
  } = useFormContext();

  return errors[name] && <span>{errors[name].message}</span>;
}
