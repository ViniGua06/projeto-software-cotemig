import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const slice = createSlice({
  name: "modal",
  initialState: {
    ativo: false,
    tipo: "",
  },
  reducers: {
    ativar(state, { payload }) {
      return { ...state, ativo: true, tipo: payload };
    },
    desativar(state) {
      return { ...state, ativo: false, tipo: "" };
    },
  },
});

export const { ativar, desativar } = slice.actions;

export const modalSelect = (state: RootState) => state.modal;

export default slice.reducer;
