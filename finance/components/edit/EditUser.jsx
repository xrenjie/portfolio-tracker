import React from 'react';
import { z } from 'zod';
import { Form } from '../general/form';
import { FinanceUser } from '../../models';
import { Body, Row, Section } from '../general/layout';
import { Modal } from '../general/components';

const validationSchema = z
  .object({
    netWorth: z
      .number()
      .multipleOf(0.01)
      .refine(() => true),
  })
  .required({
    netWorth: true,
  });

export function EditUser({ openerProps, user, title }) {
  const onSubmit = (values) => {
    const newUser = new FinanceUser(
      { ...user, netWorth: values.netWorth },
      user.id
    );
    openerProps.resolve(newUser);
  };

  const defaultValues = {
    ...user,
    netWorth: user.netWorth || 0.0,
  };

  return (
    <Form.Form
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      defaultValues={defaultValues}
    >
      <Modal.ModalLayout
        header={title}
        body={
          <Body title="">
            <Section title="">
              <Row label="Name">
                <span>
                  {user.firstname} {user.lastname}
                </span>
              </Row>
              <Row label="Email">
                <span>{user.email}</span>
              </Row>
              <Row>
                <Form.NumberInput
                  name="netWorth"
                  label="Net Worth"
                  type="number"
                  step="0.01"
                />
              </Row>
            </Section>
          </Body>
        }
        footer={<Form.Button label="Submit" name="asdf" type="submit" />}
      />
    </Form.Form>
  );
}
