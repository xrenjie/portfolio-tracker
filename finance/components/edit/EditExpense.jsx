import React, { useState } from 'react';
import { z } from 'zod';
import { useUser } from '@auth0/nextjs-auth0/client';
import moment from 'moment/moment';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Form } from '../general/form';
import { Expense } from '../../models';
import { Body, Row, Section } from '../general/layout';
import { Modal } from '../general/components';

const validationSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    description: z.string(),
    amount: z
      .number()
      .multipleOf(0.01)
      .min(0.01, { message: 'Amount must be greater than 0' }),
    // .refine((num) => num !== 0, {
    //   message: 'Amount must be non-zero',
    // }),
    date: z.coerce.date(),
    type: z.string().refine((type) => type === 'expense' || type === 'income'),
    recurrringFrequency: z.string(),
    duration: z.string(),
    numberOfTimesToRecur: z.number(),
    recurringEndDate: z.coerce.date(),
  })
  .required({
    name: true,
    amount: true,
    date: true,
  });

const yyyymmdd = 'YYYY-MM-DD';

const getDate = (expense) => {
  if (expense && expense.date) {
    const date = moment(expense.date.toString()).format(yyyymmdd);
    return date;
  }
  const date = moment(new Date().toString()).format(yyyymmdd);
  return date;
};

export function EditExpense({ openerProps, expense, title }) {
  const { user } = useUser();
  // const [type, setType] = useState(expense.type ? expense.type : 'expense');

  const onSubmit = (values) => {
    // values.type = type;
    const newExpense = new Expense(values, user.id);
    if (expense.id) newExpense.setId(expense.id);
    openerProps.resolve(newExpense);
  };

  const defaultValues = {
    ...expense,
    date: getDate(expense),
    type: expense.type ? expense.type : 'expense',
    recurrringFrequency: expense.recurrringFrequency || 'weekly',
    duration: expense.duration || 'forever',
    numberOfTimesToRecur: expense.numberOfTimesToRecur || 1,
    recurringEndDate: getDate(expense),
  };

  return (
    <Form.Form
      validationSchema={validationSchema}
      defaultValues={defaultValues}
    >
      <Modal.ModalLayout
        header={title}
        body={
          <Body title="">
            <Section title="">
              <Row>
                <Form.Input name="name" label="Expense Name" />
              </Row>
              <Row>
                <Form.Input name="description" label="Description" />
              </Row>
              <Row>
                <Form.NumberInput
                  name="amount"
                  label="Amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                />
              </Row>

              <Row>
                <Form.ToggleButtonGroup
                  name="type"
                  label="Type"
                  // value={type}
                  // onChange={(e, newType) => {
                  //   if (newType) setType(newType);
                  // }}
                >
                  <ToggleButton name="type" value="expense" label="Expense">
                    Expense
                  </ToggleButton>
                  <ToggleButton name="type" value="income" label="Income">
                    Income
                  </ToggleButton>
                </Form.ToggleButtonGroup>
              </Row>
              <Row>
                <Form.Input
                  name="date"
                  label="Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Row>

              <Row>
                <Form.Switch name="recurring" label="Repeating" />
              </Row>

              <RecurringSection />
            </Section>
          </Body>
        }
        footer={
          <Form.SubmitButton
            onSubmit={onSubmit}
            label="Submit"
            name="asdf"
            type="submit"
          />
        }
      />
    </Form.Form>
  );
}

const frequencyChoices = [
  { id: 'daily', text: 'Daily' },
  { id: 'weekly', text: 'Weekly' },
  { id: 'monthly', text: 'Monthly' },
  { id: 'yearly', text: 'Yearly' },
];

function RecurringSection() {
  const { watch, getValues } = useFormContext();
  const recurringChecked = watch('recurring');
  const duration = watch('duration');

  if (!recurringChecked) return null;

  return (
    <Section>
      <Row>
        <Form.Select
          type="number"
          name="recurrringFrequency"
          label="Frequency"
          choices={frequencyChoices}
        />
      </Row>
      <Row>
        <div className="tw-h-12">
          <Form.ToggleButtonGroup
            name="duration"
            label="Repeat duration"
            // value={duration}
            // onChange={(e, newType) => {
            //   if (newType) setDuration(newType);
            // }}
            exclusive
          >
            <ToggleButton value="forever">Forever</ToggleButton>
            <ToggleButton value="number">Number of times</ToggleButton>
            <ToggleButton value="until">Until</ToggleButton>
          </Form.ToggleButtonGroup>
        </div>
      </Row>
      {duration === 'number' && (
        <Row>
          <Form.Input name="numberOfTimesToRecur" label="Repeat # of times" />
        </Row>
      )}
      {duration === 'until' && (
        <Row>
          <Form.Input
            type="date"
            name="recurringEndDate"
            label="End Date"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Row>
      )}
    </Section>
  );
}
