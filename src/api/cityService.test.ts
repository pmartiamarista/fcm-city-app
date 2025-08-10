import { graphql } from '@/graphql/config/client';

import { fetchAllCities, fetchCityById } from './cityService';

jest.mock('@/graphql/config/client', () => ({
  graphql: {
    getCity: jest.fn(),
    GetCities: jest.fn(),
  },
}));

describe('City Service', () => {
  const mockCity = { id: '1', name: 'Almería' };
  const mockCities = [
    { id: '1', name: 'Almería' },
    { id: '2', name: 'Granada' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchCityById', () => {
    it('should return city data when GraphQL query succeeds', async () => {
      (graphql.getCity as jest.Mock).mockResolvedValue({ City: mockCity });

      const result = await fetchCityById('1');
      expect(result).toEqual(mockCity);
      expect(graphql.getCity).toHaveBeenCalledWith({ id: '1' });
    });

    it('should return null when GraphQL query throws an error', async () => {
      (graphql.getCity as jest.Mock).mockRejectedValue(
        new Error('Network error'),
      );

      const result = await fetchCityById('1');
      expect(result).toBeNull();
    });

    it('should return null when response is malformed', async () => {
      (graphql.getCity as jest.Mock).mockResolvedValue({});

      const result = await fetchCityById('1');
      expect(result).toBeNull();
    });
  });

  describe('fetchAllCities', () => {
    it('should return list of cities when GraphQL query succeeds', async () => {
      (graphql.GetCities as jest.Mock).mockResolvedValue({
        allCities: mockCities,
      });

      const result = await fetchAllCities();
      expect(result).toEqual(mockCities);
      expect(graphql.GetCities).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when GraphQL query throws an error', async () => {
      (graphql.GetCities as jest.Mock).mockRejectedValue(
        new Error('Query failed'),
      );

      const result = await fetchAllCities();
      expect(result).toEqual([]);
    });

    it('should return empty array when response is malformed', async () => {
      (graphql.GetCities as jest.Mock).mockResolvedValue({});

      const result = await fetchAllCities();
      expect(result).toEqual([]);
    });
  });
});
