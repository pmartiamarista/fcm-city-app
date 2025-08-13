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
      mockedGetCityPlace.mockResolvedValue({
        allPlaces: [
          {
            key: 'ALM',
            place: {
              type: 'monument',
              name: 'Alcazaba',
              coordinates: [36.8381, -2.4597],
            },
          },
          {
            key: 'ALM',
            place: {
              type: 'monument',
              name: 'Cathedral',
              coordinates: [36.84, -2.4678],
            },
          },
          null,
        ],
      });

      const result = await getCityPlace({ key: 'ALM' });

      expect(result).toBeDefined();
      expect(result?.allPlaces?.length).toBeGreaterThan(0);

      if (result?.allPlaces) {
        const firstValidPlace = result.allPlaces.find((p) => p !== null);
        expect(firstValidPlace).toBeDefined();
        expect(firstValidPlace?.key).toBe('ALM');
        expect(firstValidPlace?.place.name).toBe('Alcazaba');
        expect(firstValidPlace?.place.coordinates[0]).toBeCloseTo(36.8381); // lat
        expect(firstValidPlace?.place.coordinates[1]).toBeCloseTo(-2.4597); // lng
      } else {
        fail('Expected result.allPlaces to be defined');
      }
    });

    it('should return null if no places are found', async () => {
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
          null, // simulate a possible null entry
        ],
      });

      const result = await fetchAllCities();

      expect(result).toBeDefined();
      expect(result?.allCities?.length).toBeGreaterThanOrEqual(2);

      if (result?.allCities) {
        const validCities = result.allCities.filter((city) => city !== null);
        expect(validCities.length).toBeGreaterThanOrEqual(2);
        expect(validCities[0]?.key).toBe('ALM');
        expect(validCities[1]?.name).toBe('Granada');
      } else {
        fail('Expected result.allCities to be defined');
      }
    });

    it('should return null if no cities are found', async () => {
      mockedFetchAllCities.mockResolvedValue(null);

      const result = await fetchAllCities();

      expect(result).toBeNull();
    });
  });
});
