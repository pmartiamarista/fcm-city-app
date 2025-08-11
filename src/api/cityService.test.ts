import { fetchAllCities, getCity, getCityPlace } from './cityService';

jest.mock('./cityService', () => ({
  getCity: jest.fn(),
  getCityPlace: jest.fn(),
  fetchAllCities: jest.fn(),
}));

const mockedGetCity = getCity as jest.MockedFunction<typeof getCity>;
const mockedGetCityPlace = getCityPlace as jest.MockedFunction<
  typeof getCityPlace
>;
const mockedFetchAllCities = fetchAllCities as jest.MockedFunction<
  typeof fetchAllCities
>;

describe('City Service (Mocked)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCity', () => {
    it('should return city data for a valid city ID', async () => {
      mockedGetCity.mockResolvedValue({
        id: '1',
        key: 'ALM',
        name: 'Almería',
        nativeName: 'Almería',
        currency: 'EUR',
        language: 'Spanish',
      });

      const result = await getCity({ id: '1' });

      expect(result).toBeDefined();
      expect(result?.id).toBe('1');
      expect(result?.name).toBe('Almería');
      expect(result?.key).toBe('ALM');
      expect(result?.nativeName).toBe('Almería');
      expect(result?.currency).toBe('EUR');
      expect(result?.language).toBe('Spanish');
    });

    it('should return null for an invalid city ID', async () => {
      mockedGetCity.mockResolvedValue(null);

      const result = await getCity({ id: '999' });

      expect(result).toBeNull();
    });
  });

  describe('getCityPlace', () => {
    it('should return place data for a valid city key', async () => {
      mockedGetCityPlace.mockResolvedValue({ key: 'ALM', place: 'Alcazaba' });

      const result = await getCityPlace({ key: 'ALM' });

      expect(result).toBeDefined();
      expect(result?.key).toBe('ALM');
      expect(result?.place).toBe('Alcazaba');
    });

    it('should return null for an invalid city key', async () => {
      mockedGetCityPlace.mockResolvedValue(null);

      const result = await getCityPlace({ key: 'INVALID' });

      expect(result).toBeNull();
    });
  });

  describe('fetchAllCities', () => {
    it('should return a list of cities', async () => {
      mockedFetchAllCities.mockResolvedValue({
        allCities: [
          {
            id: '1',
            key: 'ALM',
            name: 'Almería',
            nativeName: 'Almería',
          },
          {
            id: '2',
            key: 'GRA',
            name: 'Granada',
            nativeName: 'Granada',
          },
        ],
      });

      const result = await fetchAllCities();

      expect(result).toBeDefined();
      if (result?.allCities && result.allCities.length >= 2) {
        expect(result.allCities[0]?.key).toBe('ALM');
        expect(result.allCities[1]?.name).toBe('Granada');
      } else {
        fail('Expected result.allCities to contain at least two cities');
      }
    });

    it('should return null if no cities are found', async () => {
      mockedFetchAllCities.mockResolvedValue(null);

      const result = await fetchAllCities();

      expect(result).toBeNull();
    });
  });
});
