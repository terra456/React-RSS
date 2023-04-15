import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Character, Info } from 'rickmortyapi';

// Define a service using a base URL and expected endpoints
export const rickAndMortyApi = createApi({
  reducerPath: 'rickAndMortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api' }),
  endpoints: (builder) => ({
    getCharacterById: builder.query<Info<Character>, number>({
      query: (id) => `/character/${id}`,
    }),
    getAllCharacters: builder.query<Info<Character[]>, number>({
      query: (page = 1) => ({
        url: `/character`,
        params: {
          _page: page,
        },
      }),
    }),
    getCharactersBySearch: builder.query<Info<Character[]>, number>({
      query: (str, page = 1) => ({
        url: `/character`,
        params: {
          _page: page,
          _name: str,
        },
      }),
    }),
  }),
});
