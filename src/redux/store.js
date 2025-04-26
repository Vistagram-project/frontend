import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userReducer } from "./reducers/user/userReducer";
import { mobileReducer } from "./reducers/mobile/mobileReducer";
import { chatReducer } from "./reducers/chat/chatReducer";

// persist config
const persistConfig = {
  key: "user",
  storage: AsyncStorage,
  whitelist: ["isAuthenticated", "userDetails"],
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    mobile: mobileReducer,
    chat: chatReducer
  },
  devTools: process.env.VITE_REACT_APP_NODE_ENV !== "DEV",

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist action types
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
