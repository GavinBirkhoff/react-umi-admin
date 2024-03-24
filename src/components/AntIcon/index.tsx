import * as icons from '@ant-design/icons';
import React, { useMemo } from 'react';

interface AntIconProps {
  icon: string;
  style?: React.CSSProperties;
  className?: string;
}

const AntIcon: React.FC<AntIconProps> = ({ icon, style, className }) => {
  const AntIconComponent = useMemo(() => {
    const IconComponent = (icons as any)[icon];
    if (IconComponent) {
      return <IconComponent />;
    } else {
      console.error(`AntIcon: Icon "${icon}" not found.`);
      return null;
    }
  }, [icon]);

  return (
    <span style={style} className={className}>
      {AntIconComponent}
    </span>
  );
};

export default AntIcon;
