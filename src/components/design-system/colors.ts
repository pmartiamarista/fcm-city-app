import { z } from 'zod';

const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

const appColorsSchema = z.record(
  z.string(),
  z.string().regex(hexColorRegex, { message: 'Invalid HEX color' }),
);

const colors = {
  // Functional Light Green
  functionalLightGreen50: '#f0f5d2',
  functionalLightGreen100: '#e8f0bc',
  functionalLightGreen200: '#dde99b',
  functionalLightGreen300: '#d2e279',
  functionalLightGreen400: '#c7da58',
  functionalLightGreen500: '#bbd336',
  functionalLightGreen600: '#a2b828',
  functionalLightGreen700: '#859721',
  functionalLightGreen800: '#67751a',
  functionalLightGreen900: '#3b430f',

  // Functional Dark Green
  functionalDarkGreen50: '#f3f6f6',
  functionalDarkGreen100: '#dce5e4',
  functionalDarkGreen200: '#b8ccc8',
  functionalDarkGreen300: '#95b2ad',
  functionalDarkGreen400: '#719892',
  functionalDarkGreen500: '#506e69',
  functionalDarkGreen600: '#455f5a',
  functionalDarkGreen700: '#3c534f',
  functionalDarkGreen800: '#2b3b38',
  functionalDarkGreen900: '#1a2322',

  // Functional Lino
  functionalLino50: '#efe7dc',
  functionalLino100: '#dfcfb9',
  functionalLino200: '#ccb28f',
  functionalLino300: '#bf9f73',
  functionalLino400: '#b28c57',
  functionalLino500: '#9a7747',
  functionalLino600: '#7e613a',
  functionalLino700: '#624c2d',
  functionalLino800: '#463620',
  functionalLino900: '#090a0c',

  // Functional Siena
  functionalSiena50: '#fcf1ed',
  functionalSiena100: '#fae2db',
  functionalSiena200: '#f5c6b8',
  functionalSiena300: '#f0a994',
  functionalSiena400: '#eb8d70',
  functionalSiena500: '#e67350',
  functionalSiena600: '#d6491f',
  functionalSiena700: '#b33d19',
  functionalSiena800: '#6b250f',
  functionalSiena900: '#361208',

  // Main Deep Blue
  mainDeepBlue50: '#eff4fa',
  mainDeepBlue100: '#c1d3eb',
  mainDeepBlue200: '#a2bce2',
  mainDeepBlue300: '#739bd3',
  mainDeepBlue400: '#3b70ba',
  mainDeepBlue500: '#284b7d',
  mainDeepBlue600: '#22416d',
  mainDeepBlue700: '#182f4e',
  mainDeepBlue800: '#0f1c2f',
  mainDeepBlue900: '#050910',

  // Neutral
  neutral50: '#ffffff',
  neutral100: '#f6f8fa',
  neutral200: '#e6ebef',
  neutral300: '#c1cdd7',
  neutral400: '#839baf',
  neutral500: '#374b5a',
  neutral600: '#2f3f4c',
  neutral700: '#27353f',
  neutral800: '#172026',
  neutral900: '#080b0d',

  // Secondary Light Blue
  secondaryLightBlue50: '#f2f6f7',
  secondaryLightBlue100: '#e6ecf0',
  secondaryLightBlue200: '#d9e3e8',
  secondaryLightBlue300: '#ccdae0',
  secondaryLightBlue400: '#bfd0d9',
  secondaryLightBlue500: '#b4c8d2',
  secondaryLightBlue600: '#8cabba',
  secondaryLightBlue700: '#5c8599',
  secondaryLightBlue800: '#456373',
  secondaryLightBlue900: '#2e424d',
};

export const appColors = appColorsSchema.parse(colors);

export type AppColor = keyof typeof appColors;
export type AppColorAttr = { color: AppColor };
