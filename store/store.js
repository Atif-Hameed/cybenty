import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import quizReducer from "./quizSlice";
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import { version } from "react";

///////////////////////// uncoment when need to use persisitor in producion mode ////////////////////////////////////

// Configuration for Redux Persist
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  stateReconciler: autoMergeLevel2,
};

// Combine reducers (if you have more slices in the future)
const rootReducer = combineReducers({
  user: userReducer,
  quiz: quizReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disables the check for non-serializable values
    }),
});

export const persistor = persistStore(store);











// Combine reducers (if you have more slices in the future)
// const rootReducer = combineReducers({
//   user: userReducer, // here you can add more reducers if needed
// });

// // Configure store with normal reducer
// export const store = configureStore({
//   reducer: rootReducer, // Use rootReducer directly
// });