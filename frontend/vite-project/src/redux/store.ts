import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/slice";
import modalReducer from "./modal/slice";

const persistConfig = {
  key: "root",
  storage,
};

const userPersistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: userPersistedReducer,
    modal: modalReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
