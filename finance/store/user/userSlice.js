/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { updateUser } from '../requests';

export const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    SET_USER: (state, action) => {
      state.userDetails = { ...state.user, ...action.payload };
    },
    FETCH_USER: () => {},
    UPDATE_USER: (state, action) => {
      updateUser(action.payload);
    },
  },
});

export const { actions } = userSlice;
export const userReducer = userSlice.reducer;

export const updateUserDetails = (user) => (dispatch) => {
  updateUser(user).then(() => {
    dispatch(actions.FETCH_USER());
  });
};

export const useUserState = () => {
  const s = useSelector((state) => state.user);
  return s;
};
