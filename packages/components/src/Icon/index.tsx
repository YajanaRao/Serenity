import * as React from 'react';
import ICONS from './Icon';

export interface IconProps {
  name: string;
  size?: number;
  color?: string;
  direction?: 'rtl' | 'ltr';
  allowFontScaling?: boolean | undefined;
}

export const Icon = ({
  name, size = 40, color = '#000000', ...props
}: IconProps) => {
  // @ts-ignore
  const IconImpl = ICONS[name];
  if (!IconImpl) console.error('missing icon', name);
  return IconImpl ? (
    <IconImpl width={size} height={size} color={color} {...props} />
  ) : null;
};
