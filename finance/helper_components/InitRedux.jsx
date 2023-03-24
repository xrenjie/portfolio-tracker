import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../models';
import { ExpenseStore, UserStore } from '../store';
import { getAccessTokenFromCookie, setCookie } from '../utils/client_utils';

const getAccessToken = async (user, router) => {
  try {
    const res = await fetch('/api/session/getAccessToken', {
      body: JSON.stringify(user),
      method: 'POST',
    });

    const resJson = await res.json();
    if (res.status !== 200) throw resJson;
    setCookie('access_token', resJson, 1);
  } catch (err) {
    if (err.code === 'ERR_EXPIRED_ACCESS_TOKEN') {
      router.push('/api/auth/logout');
    }
  }
};

const registerUser = async (user) => {
  const newUser = new User(user);

  const userRes = await fetch('/api/users/registerUser', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: getAccessTokenFromCookie(),
    },
    body: JSON.stringify(newUser),
  });
  const userResJson = await userRes.json();
  if (typeof userResJson === 'string') return JSON.parse(userResJson).data;
  return userResJson.data.user;
};

export default function InitRedux({ children }) {
  const { user } = useUser();
  const userState = useSelector((state) => state.user.userDetails);
  const dispatch = useDispatch();
  const router = useRouter();

  const initReduxAndAuth = async () => {
    if (!user || userState?.id) return;
    await getAccessToken(user, router);
    try {
      const userData = await registerUser(user);
      if (userData) {
        dispatch(UserStore.actions.SET_USER(userData));
        dispatch(ExpenseStore.actions.FETCH_EXPENSES());
      }
    } catch (err) {
      // console.log(err);
    }
  };

  // store token in cookie
  useEffect(() => {
    if (!user) {
      dispatch(UserStore.actions.SET_USER(null));
      dispatch(ExpenseStore.actions.SET_EXPENSES([]));
    }

    if (!user || userState?.id) return;
    initReduxAndAuth();
  }, [user]);

  return children;
}
