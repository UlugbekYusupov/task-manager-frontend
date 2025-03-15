// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./slices/authSlice";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import authReducer from "./slices/authSlice";
import projectReducer from "./slices/projectSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  projects: persistReducer(persistConfig, projectReducer),
});

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
