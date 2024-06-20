import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/slice";
import modalReducer from "./modal/slice";
import churchReducer from "./church/slice";

const persistConfig = {
  key: "root",
  storage,
};
const userPersistedReducer = persistReducer(persistConfig, userReducer);
const churchPersistedReducer = persistReducer(persistConfig, churchReducer);

export const store = configureStore({
  reducer: {
    user: userPersistedReducer,
    modal: modalReducer,
    church: churchPersistedReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
