import reducer from "./reducer";
import userReducer from "./userReducers";
import commonReducer from "./commonReducer";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistedUserReducer = persistReducer(
  {
    key: "User",
    storage: storage,
    whitelist: [
      "id",
      "access_token",
      "refresh_token",
      "name",
      "phone",
      "date_of_birth",
      "address",
      "email",
      "check_submit",
    ],
  },
  userReducer,
);

const rootReducer = combineReducers({
  reducer: reducer,
  userReducer: persistedUserReducer,
  commonReducer: commonReducer,
});

export const store = configureStore({
  reducer: { rootReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
