import React from 'react';
import Head from 'next/head';
import { useUser } from '@auth0/nextjs-auth0/client';
import { ExpenseDashboard } from '../components';
import { useReloadExpenses } from '../utils/hooks';

export default function Home() {
  const { user } = useUser();
  useReloadExpenses(user);

  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APPNAME}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user ? <ExpenseDashboard /> : <HomeNoAuth />}
    </>
  );
}

function HomeNoAuth() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

export const getServerSideProps = () => ({ props: {} });
