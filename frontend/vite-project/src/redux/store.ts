import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/slice";

const persistConfig = {
  key: "root",
  storage,
};

const userPersistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: userPersistedReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
