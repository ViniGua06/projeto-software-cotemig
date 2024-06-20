import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const slice = createSlice({
  name: "church",
  initialState: {
    church_id: "",
    church_name: "",
    church_code: "",
    church_photo: "",
    role: "",
    integrants: [],
  },
  reducers: {
    changeChurch(state, { payload }) {
      return {
        ...state,
        church_id: payload.church_id,
        church_name: payload.church_name,
        church_code: payload.church_code,
        church_photo: payload.church_photo,
        integrants: payload.integrants,
        role: payload.role,
      };
    },
  },
});

export const { changeChurch } = slice.actions;

export const churchSelect = (state: RootState) => state.church;

export default slice.reducer;
