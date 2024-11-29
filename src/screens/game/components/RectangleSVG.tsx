import React, { memo, type FC } from 'react';
import { SvgXml } from 'react-native-svg';

interface RectangleSVGProps {
  paths: { x: number; y: number }[];
}

const RectangleSVG: FC<RectangleSVGProps> = (props) => {
  return (
    <SvgXml
      xml={`<svg width="364" height="194" viewBox="0 0 364 194" fill="none" xmlns="http://www.w3.org/2000/svg">
            ${props.paths
              .map(
                (i) =>
                  `<path d='M${i.x} ${i.y}L0 194H${i.x}V127Z' fill="#d5b859" fill-opacity="${i.x / 1000}"/>`
              )
              .toString()
              .split(',')
              .join(' ')}
            </svg>`}
      strokeLinecap="round"
      opacity={0.2}
      style={{ marginTop: 6 }}
    />
  );
};

export default memo(RectangleSVG);
