import { appColors } from './colorTypes';

export const appShadows = {
  shadow100: {
    shadowColor: appColors.neutral200,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.0,
    elevation: 1,
  },
  shadow200: {
    shadowColor: appColors.neutral400,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.11,
    shadowRadius: 1.51,
    elevation: 2,
  },
  shadow300: {
    shadowColor: appColors.neutral500,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2.54,
    elevation: 1,
  },
  shadow400: {
    shadowColor: appColors.neutral500,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.14,
    shadowRadius: 5.62,
    elevation: 6,
  },
  shadow500: {
    shadowColor: appColors.neutral500,
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.16,
    shadowRadius: 7.68,
    elevation: 10,
  },
  shadow600: {
    shadowColor: appColors.neutral500,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.19,
    shadowRadius: 15.38,
    elevation: 19,
  },
};

export type AppShadows = keyof typeof appShadows;
export type ShadowLevel = { shadowLevel: AppShadows };
