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
    return response.City;
  } catch {
    // Return null if the city could not be fetched or an error occurred
    return null;
  }
};

/**
 * Fetches a list of all available cities.
 * Executes the 'GetCities' GraphQL query.
 *
 * @returns An array of city objects; returns an empty array if an error occurs.
 */
export const fetchAllCities = async () => {
  try {
    const response = await graphql.GetCities();
    return response.allCities;
  } catch {
    // Return an empty array to prevent application crashes on failure
    return [];
  }
};
