import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  user_id: "",
  user_name: "",
  user_email: "",
  user_password: "",
  isLogged: false,
  user_pfp: "",
  token: "",
};

export const slice = createSlice({
  name: "user",
  initialState: {
    user_id: "",
    user_name: "",
    user_email: "",
    user_password: "",
    isLogged: false,
    user_pfp: "",
    token: "",
  },
  reducers: {
    changeUser(state, { payload }) {
      return {
        ...state,
        user_id: payload.id,
        isLogged: true,
        token: payload.token,
      };
    },

    fetchUser(state, { payload }) {
      return {
        ...state,
        user_id: payload.id,
        user_name: payload.name,
        user_email: payload.email,
        user_password: payload.password,
        user_pfp: payload.photo,
        token: payload.token,
      };
    },

    logout() {
      return initialState;
    },
  },
});

export const { changeUser, logout, fetchUser } = slice.actions;

export const userSelect = (state: RootState) => state.user;

export default slice.reducer;
