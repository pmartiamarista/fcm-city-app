import { City, GetCitiesQuery, Place } from '@/graphql/__generated__/graphql';
import { graphql } from '@/graphql/config/client';

/**
 * Retrieves a city by its unique identifier.
 *
 * Executes a GraphQL query using the provided `id` and returns the corresponding
 * city object if available. Returns `null` if the city is not found or the request fails.
 *
 * @param params - An object containing the city's `id`.
 * @returns A `City` object if found, otherwise `null`.
 */
export const getCity = async (
  params: Pick<City, 'id'>,
): Promise<City | null> => {
  try {
    const response = await graphql.getCity(params);
    return response.City ?? null;
  } catch {
    return null;
  }
};

/**
 * Retrieves a place associated with a city using its unique key.
 *
 * Executes a GraphQL query with the specified `key` and returns the corresponding
 * place object if available. Returns `null` if the place is not found or the request fails.
 *
 * @param params - An object containing the place's `key`.
 * @returns A `Place` object if found, otherwise `null`.
 */
export const getCityPlace = async (
  params: Pick<Place, 'key'>,
): Promise<Place | null> => {
  try {
    const response = await graphql.getCityPlace({ id: params.key });
    return response.Place ?? null;
  } catch {
    return null;
  }
};

/**
 * Retrieves the complete list of cities available in the system.
 *
 * Executes a GraphQL query to fetch all cities. Returns the full response only if
 * the `allCities` field is present. Returns `null` if the request fails or the expected
 * data is missing.
 *
 * @returns A `GetCitiesQuery` object containing all cities, or `null` on failure.
 */
export const fetchAllCities = async (): Promise<GetCitiesQuery | null> => {
  try {
    const response = await graphql.GetCities();
    return response?.allCities ? response : null;
  } catch {
    return null;
  }
};
