import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

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
        user_name: payload.name,
        user_email: payload.email,
        user_password: payload.password,
        user_pfp: payload.photo,
      };
    },

    logout(state) {
      return {
        ...state,
        user_id: "",
        isLogged: false,
        token: "",
      };
    },
  },
});

export const { changeUser, logout, fetchUser } = slice.actions;

export const userSelect = (state: RootState) => state.user;

export default slice.reducer;
