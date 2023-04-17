import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Character, CharacterFilter, Info } from 'rickmortyapi';

// Define a service using a base URL and expected endpoints
export const rickAndMortyApi = createApi({
  reducerPath: 'rickAndMortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  endpoints: (builder) => ({
    getCharacterById: builder.query<Character, number>({
      query: (id) => `character/${id}`,
    }),
    getAllCharacters: builder.query<Info<Character[]>, number>({
      query: (page = 1) => ({
        url: `character/`,
        params: {
          page: page,
        },
      }),
    }),
    getAllEpisodes: builder.query<Character[], number[]>({
      query: (arr) => ({
        url: `episode/${arr}`,
      }),
    }),
    getCharactersBySearch: builder.query<Info<Character[]>, CharacterFilter>({
      query: ({ name, page = 1 }) => ({
        url: `character/`,
        params: {
          page,
          name,
        },
      }),
    }),
  }),
});
