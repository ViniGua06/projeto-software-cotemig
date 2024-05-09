import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const slice = createSlice({
  name: "user",
  initialState: {
    user_id: "",
    isLogged: false,
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

export const { changeUser, logout } = slice.actions;

export const select = (state: RootState) => state.user;

export default slice.reducer;
