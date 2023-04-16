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
      {user ? 
            <ExpenseDashboard />
:
<LandingPage />
      }
    </>
  );
}

function LandingPage() {
  return (
    <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-screen tw-w-screen">
      <h1 className="tw-text-4xl tw-font-bold tw-mb-4">
        Welcome to {process.env.NEXT_PUBLIC_APPNAME}
      </h1>
      <p className="tw-text-xl tw-mb-4">
        Please login to continue
      </p>
      <a
        href="/api/auth/login"
        className="tw-p-2 tw-bg-blue-500 tw-text-white tw-rounded tw-shadow tw-text-xl tw-font-bold tw-no-underline"
      >
        Login
      </a>
    </div>

  )
}

export const getServerSideProps = () => ({ props: {} });
