import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production", // 只在開發環境啟用
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableStateInvariant: {
        warnAfter: 100, // 延後到 100ms 才警告
      },
    }),
});

export default store;
