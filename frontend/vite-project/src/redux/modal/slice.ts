import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const slice = createSlice({
  name: "modal",
  initialState: {
    ativo: false,
  },
  reducers: {
    ativar(state) {
      return { ...state, ativo: true };
    },
    desativar(state) {
      return { ...state, ativo: false };
    },
  },
});

export const { ativar, desativar } = slice.actions;

export const select = (state: RootState) => state.modal;

export slice.reducer
