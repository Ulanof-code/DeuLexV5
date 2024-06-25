// import { User } from "@prisma/client";
import { api } from "./api";


export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userData) => ({
        url: "/user/login",
        method: "POST",
        body: userData,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "/user/register",
        method: "POST",
        body: userData,
      }),
    }),
    current: builder.query({
      query: () => ({
        url: "/user/current",
        method: "GET",
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useCurrentQuery } =
  authApi;

export const {
  endpoints: { login, register, current },
} = authApi;
