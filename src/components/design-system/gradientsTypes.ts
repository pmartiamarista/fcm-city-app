import { appColors } from './colorTypes';

export const appGradientRgbColors = {
  linearGradient180: '23, 32, 38',
};

export const appGradient = {
  linearGradient180: {
    colors: [
      appColors.neutral900,
      `rgba(${appGradientRgbColors.linearGradient180}, 0)`,
    ],
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
    style: {},
  },
};

export type AppGradient = keyof typeof appGradient;
