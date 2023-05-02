import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../featuers/api/apiSlice";
import filterReducer from "../featuers/filter/filterSlice";
import authReducer from "../featuers/auth/authSlice";
import quizSlice from "../featuers/quizes/quizSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,

    filter: filterReducer,
    auth: authReducer,
    quiz: quizSlice,
  },
  middleware: (getDefautlMiddlewares) =>
    getDefautlMiddlewares().concat(apiSlice.middleware),
});
