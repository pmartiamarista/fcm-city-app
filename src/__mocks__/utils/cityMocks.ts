import {
  City,
  GetCitiesQuery,
  GetCityPlaceQuery,
} from '@/graphql/__generated__/graphql';

/**
 * Creates a mock City object with default values
 * @param overrides - Partial properties to override defaults
 * @returns A complete City object
 */
export const createMockCity = (overrides: Partial<City> = {}): City => ({
  id: '1',
  name: 'Paris',
  key: 'paris',
  nativeName: 'Paris',
  currency: 'EUR',
  language: 'French',
  ...(overrides as Record<string, unknown>),
});

/**
 * Creates an array of mock cities
 * @param count - Number of cities to create
 * @param baseOverrides - Base overrides for all cities
 * @returns Array of City objects
 */
export const createMockCities = (
  count: number = 2,
  baseOverrides: Partial<City> = {},
): NonNullable<GetCitiesQuery['allCities']> => {
  const cities: NonNullable<GetCitiesQuery['allCities']> = [];

  for (let i = 0; i < count; i++) {
    const cityId = (i + 1).toString();
    cities.push(
      createMockCity({
        id: cityId,
        name: i === 0 ? 'Paris' : 'Tokyo',
        key: i === 0 ? 'paris' : 'tokyo',
        nativeName: i === 0 ? 'Paris' : '東京',
        currency: i === 0 ? 'EUR' : 'JPY',
        language: i === 0 ? 'French' : 'Japanese',
        ...baseOverrides,
      }),
    );
  }

  return cities;
};

/**
 * Creates a mock GetCitiesQuery response
 * @param cities - Array of cities (optional, will create defaults if not provided)
 * @returns GetCitiesQuery object
 */
export const createMockCitiesQuery = (
  cities?: NonNullable<GetCitiesQuery['allCities']>,
): GetCitiesQuery => ({
  allCities: cities || createMockCities(),
});

/**
 * Creates a mock place object
 * @param overrides - Partial properties to override defaults
 * @returns A complete place object
 */
export const createMockPlace = (overrides: Record<string, unknown> = {}) => ({
  key: 'eiffel-tower',
  place: {
    type: 'monument',
    name: 'Eiffel Tower',
    coordinates: [48.8584, 2.2945] as [number, number],
    ...(overrides.place as Record<string, unknown>),
  },
  ...overrides,
});

/**
 * Creates an array of mock places
 * @param count - Number of places to create
 * @param baseOverrides - Base overrides for all places
 * @returns Array of place objects
 */
export const createMockPlaces = (
  count: number = 3,
  baseOverrides: Record<string, unknown> = {},
) => {
  const places = [];
  const placeNames = ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame Cathedral'];
  const placeKeys = ['eiffel-tower', 'louvre-museum', 'notre-dame'];
  const placeTypes = ['monument', 'museum', 'cathedral'];

  for (let i = 0; i < count; i++) {
    places.push(
      createMockPlace({
        key: placeKeys[i],
        place: {
          type: placeTypes[i],
          name: placeNames[i],
          coordinates: [48.8584 + i * 0.01, 2.2945 + i * 0.01] as [
            number,
            number,
          ],
          ...((baseOverrides.place as Record<string, unknown>) || {}),
        },
        ...(baseOverrides as Record<string, unknown>),
      }),
    );
  }

  return places;
};

/**
 * Creates a mock GetCityPlaceQuery response
 * @param places - Array of places (optional, will create defaults if not provided)
 * @returns GetCityPlaceQuery object
 */
export const createMockCityPlaceQuery = (
  places?: NonNullable<GetCityPlaceQuery['allPlaces']>,
): GetCityPlaceQuery => ({
  allPlaces: places || createMockPlaces(),
});

/**
 * Predefined mock cities for common use cases
 */
export const mockCities = {
  paris: createMockCity({
    id: '1',
    name: 'Paris',
    key: 'paris',
    nativeName: 'Paris',
    currency: 'EUR',
    language: 'French',
  }),
  tokyo: createMockCity({
    id: '2',
    name: 'Tokyo',
    key: 'tokyo',
    nativeName: '東京',
    currency: 'JPY',
    language: 'Japanese',
  }),
  newYork: createMockCity({
    id: '3',
    name: 'New York',
    key: 'new-york',
    nativeName: 'New York',
    currency: 'USD',
    language: 'English',
  }),
  london: createMockCity({
    id: '4',
    name: 'London',
    key: 'london',
    nativeName: 'London',
    currency: 'GBP',
    language: 'English',
  }),
};

/**
 * Predefined mock places for common use cases
 */
export const mockPlaces = {
  eiffelTower: createMockPlace({
    key: 'eiffel-tower',
    place: {
      type: 'monument',
      name: 'Eiffel Tower',
      coordinates: [48.8584, 2.2945] as [number, number],
    },
  }),
  louvre: createMockPlace({
    key: 'louvre-museum',
    place: {
      type: 'museum',
      name: 'Louvre Museum',
      coordinates: [48.8606, 2.3376] as [number, number],
    },
  }),
  notreDame: createMockPlace({
    key: 'notre-dame',
    place: {
      type: 'cathedral',
      name: 'Notre-Dame Cathedral',
      coordinates: [48.853, 2.3499] as [number, number],
    },
  }),
};
