import { useCallback } from 'react';
import { Alert, Platform } from 'react-native';

import { createActionsStateReturn } from '@/utils/createActionsStateReturn/createActionsStateReturn';
import { openLink } from '@/utils/openLink/openLink';

import { Coordinates, coordinatesSchema } from '@/types/placeMetadata';

type UseMapLinkProps = Partial<Coordinates>;

export const useMapLink = ({ coordinates }: UseMapLinkProps) => {
  const openMap = useCallback(async () => {
    const result = coordinatesSchema.safeParse({ coordinates });

    if (!result.success) {
      Alert.alert(
        'Invalid Coordinates',
        'The provided location coordinates are not valid.',
      );
      return;
    }

    const {
      coordinates: [lat, lon],
    } = result.data;

    const query = `${lat},${lon}`;
    const fallbackUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

    const nativeUrl = Platform.select({
      ios: `maps://?q=${query}&ll=${query}`,
      android: `geo:${query}`,
      web: fallbackUrl,
      windows: fallbackUrl,
    });

    const resultNative = await openLink(nativeUrl!);

    if (!resultNative.success) {
      await openLink(fallbackUrl);
    }
  }, [coordinates]);

  return createActionsStateReturn({ openMap });
};
