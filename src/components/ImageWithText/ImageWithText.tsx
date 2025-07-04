import React, { ReactNode } from 'react';
import { Box } from '@mui/material';

interface ImageWithTextProps {
  children: ReactNode;
  className?: string;
  imgWidth?: number;
  icon?: string;
}

const ImageWithText: React.FC<ImageWithTextProps> = ({
  children,
  className = '',
  imgWidth = 16,
  icon
}) => {
  return (
    <Box className={`!tw-flex !tw-flex-col !tw-items-center !tw-justify-center !tw-text-center ${className}`}>
      {icon && (
        <img 
          src={icon} 
          alt="No records" 
          style={{ width: `${imgWidth}rem`, height: 'auto', marginBottom: '1rem' }}
        />
      )}
      {children}
    </Box>
  );
};

export default ImageWithText;