import IconArrowLeft from '../icons/IconArrowLeft';
import IconArrowRight from '../icons/IconArrowRight';
import IconCity from '../icons/IconCity';

export const appIcons = {
  arrowLeft: IconArrowLeft,
  arrowRight: IconArrowRight,
  city: IconCity,
};

export type AppIcon = keyof typeof appIcons;

export type AppIconAttr = { icon: AppIcon };
