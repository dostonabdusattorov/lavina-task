import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../constants";
import { md5Hash } from "../../utils";

export const bookshelfApi = createApi({
  reducerPath: "bookshelfApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Content-type", "appliation/json");

      const key = localStorage.getItem("key");

      if (key) {
        headers.set("Key", key);
      }

      return headers;
    },
  }),
  tagTypes: ["books"],
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => {
        const Hash = md5Hash(
          "GET",
          "/books",
          "",
          localStorage.getItem("secret")
        );

        return {
          url: "/books",
          headers: {
            Sign: Hash,
          },
        };
      },
      providesTags: ["books"],
    }),
    getUser: builder.query({
      query: () => {
        const Hash = md5Hash(
          "GET",
          "/myself",
          "",
          localStorage.getItem("secret")
        );

        return {
          url: "/myself",
          headers: {
            Sign: Hash,
          },
        };
      },
    }),
    signUp: builder.mutation({
      query: (body) => {
        return {
          url: "/signup",
          method: "POST",
          body,
        };
      },
    }),
    createBook: builder.mutation({
      query: (body) => {
        const Hash = md5Hash(
          "POST",
          "/books",
          JSON.stringify(body),
          localStorage.getItem("secret")
        );
        return {
          url: "/books",
          method: "POST",
          headers: {
            Sign: Hash,
          },
          body,
        };
      },
      invalidatesTags: ["books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => {
        const Hash = md5Hash(
          "DELETE",
          `/books/${id}`,
          "",
          localStorage.getItem("secret")
        );
        return {
          url: `/books/${id}`,
          method: "DELETE",
          headers: {
            Sign: Hash,
          },
        };
      },
      invalidatesTags: ["books"],
    }),
    editBook: builder.mutation({
      query: (payload) => {
        const Hash = md5Hash(
          "PATCH",
          `/books/${payload.id}`,
          JSON.stringify(payload.body),
          localStorage.getItem("secret")
        );
        return {
          url: `/books/${payload.id}`,
          method: "PATCH",
          headers: {
            Sign: Hash,
          },
          body: payload.body,
        };
      },
      invalidatesTags: ["books"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetUserQuery,
  useSignUpMutation,
  useCreateBookMutation,
  useDeleteBookMutation,
  useEditBookMutation,
} = bookshelfApi;
