import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import React from 'react';
import { NetWorthChart } from '../../components/charts/NetWorthChart';

export default function NetWorth() {
  return <NetWorthChart />;
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: () => ({ props: {} }),
});
