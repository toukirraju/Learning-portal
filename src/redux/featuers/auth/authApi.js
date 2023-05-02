import apiSlice from "../api/apiSlice";
import { loggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    studentRegister: builder.mutation({
      query: (data) => ({
        url: `/register`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem(
            "auth",
            JSON.stringify({
              token: data?.accessToken,
              user: data?.user,
            })
          );

          dispatch(
            loggedIn({
              token: data?.accessToken,
              user: data?.user,
            })
          );
        } catch (error) {}
      },
    }),
    signIn: builder.mutation({
      query: (data) => ({
        url: `/login`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem(
            "auth",
            JSON.stringify({
              token: data?.accessToken,
              user: data?.user,
            })
          );

          dispatch(
            loggedIn({
              token: data?.accessToken,
              user: data?.user,
            })
          );
        } catch (error) {}
      },
    }),
  }),
});

export const { useSignInMutation, useStudentRegisterMutation } = authApi;
