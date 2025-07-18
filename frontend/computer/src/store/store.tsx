import { configureStore } from "@reduxjs/toolkit";
import ProductSliceReducer from "../reduxSlices/ProductSlice";

export const store = configureStore({
  reducer: {
    productStore: ProductSliceReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

// ✅ AppDispatch type (recommended for use with `useDispatch`)
export type AppDispatch = typeof store.dispatch;

export default store;
