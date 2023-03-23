import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import React from 'react';
import { UserPanel } from '../../components/dashboard/expense_dashboard/UserPanel';

function Me() {
  return <UserPanel />;
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: () => ({ props: {} }),
});

export default Me;
