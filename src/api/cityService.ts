import { graphql } from '@/graphql/config/client';

/**
 * Fetches a city by its unique identifier.
 *
 * @param id - The unique identifier of the city to fetch.
 * @returns The city object if found; otherwise, returns null.
 */
export const fetchCityById = async (id: string) => {
  try {
    const response = await graphql.getCity({ id });

    return response?.City ?? null;
  } catch {
    return null;
  }
};

/**
 * Fetches a list of all available cities.
 *
 * @returns An array of city objects; returns an empty array if an error occurs.
 */
export const fetchAllCities = async () => {
  try {
    const response = await graphql.GetCities();
    return response?.allCities ?? [];
  } catch {
    return [];
  }
};
